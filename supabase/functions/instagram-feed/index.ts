import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const INSTAGRAM_GRAPH_URL = "https://graph.instagram.com/me/media";
const INSTAGRAM_REFRESH_URL = "https://graph.instagram.com/refresh_access_token";
const FIELDS = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";

// Try to refresh a long-lived token. Returns the new token or null on failure.
async function tryRefreshToken(token: string): Promise<string | null> {
  try {
    const url = `${INSTAGRAM_REFRESH_URL}?grant_type=ig_refresh_token&access_token=${token}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

// Persist the refreshed token back to Supabase secrets via the management API.
// This requires SUPABASE_SERVICE_ROLE_KEY and the project ref.
async function persistToken(newToken: string) {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    // Extract project ref from URL: https://<ref>.supabase.co
    const match = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
    if (!match) return;
    const projectRef = match[1];
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!serviceKey) return;

    await fetch(
      `https://api.supabase.com/v1/projects/${projectRef}/secrets`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ name: "INSTAGRAM_ACCESS_TOKEN", value: newToken }]),
      }
    );
  } catch (e) {
    console.error("Could not persist refreshed token:", e);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit") || "9";

    let accessToken =
      url.searchParams.get("token") || Deno.env.get("INSTAGRAM_ACCESS_TOKEN");

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "No Instagram token configured", posts: [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Request more than needed so we have enough after filtering videos
    const fetchLimit = Math.max(parseInt(limit) * 4, 20);
    const apiUrl = `${INSTAGRAM_GRAPH_URL}?fields=${FIELDS}&limit=${fetchLimit}&access_token=${accessToken}`;
    let response = await fetch(apiUrl);

    // If the token is expired/invalid, try to refresh it and retry once
    if (!response.ok) {
      const errBody = await response.json();
      const errCode = errBody?.error?.code;
      const errSubcode = errBody?.error?.error_subcode;
      console.error("Instagram API error (first attempt):", JSON.stringify(errBody));

      // Error codes 190 = token expired/invalid, subcodes 460/463 = token expired
      if (errCode === 190 || errSubcode === 460 || errSubcode === 463) {
        console.log("Token appears expired — attempting refresh...");
        const refreshed = await tryRefreshToken(accessToken);
        if (refreshed) {
          accessToken = refreshed;
          console.log("Token refreshed successfully, retrying...");
          await persistToken(refreshed);
          const retryUrl = `${INSTAGRAM_GRAPH_URL}?fields=${FIELDS}&limit=${fetchLimit}&access_token=${accessToken}`;
          response = await fetch(retryUrl);
        }
      }

      if (!response.ok) {
        const finalErr = await response.json().catch(() => errBody);
        console.error("Instagram API error (final):", JSON.stringify(finalErr));
        return new Response(
          JSON.stringify({ error: "Instagram API error", details: finalErr, posts: [] }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const data = await response.json();

    const posts = (data.data || [])
      .filter((post: Record<string, string>) => post.media_type !== "VIDEO")
      .map((post: Record<string, string>) => ({
        id: post.id,
        type: post.media_type,
        url: post.media_url || post.thumbnail_url || "",
        permalink: post.permalink,
        caption: post.caption || "",
        timestamp: post.timestamp,
      }))
      .slice(0, parseInt(limit));

    return new Response(
      JSON.stringify({ posts }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error", posts: [] }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
