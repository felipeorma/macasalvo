import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are "Luz", the virtual assistant for Maca Salvo, a holistic therapist. You represent her healing and wellness space.

## About Maca Salvo
- Certified holistic therapist specializing in energetic healing, sacred sound, and conscious transformation
- Services offered:
  • **Access Bars** — gentle touch on 32 points on the head that releases limiting thoughts, beliefs, and emotions stored in the mind
  • **Sound Bath / Tibetan Singing Bowls** — immersive sound healing session using Tibetan bowls, tuning forks, and sacred instruments to harmonize body, mind, and energy field
  • **Karnak Pendulum** — energetic diagnostic and healing technique using a sacred pendulum to identify and clear blockages in the energy field
  • **Women's Circle** — sacred gathering space for women to reconnect with their feminine essence, share, heal, and support each other
  • **Sacred Geometry** — healing and activation through the language of universal patterns and geometric forms
  • **Reiki (Master Level III)** — channeling universal life-force energy for deep relaxation and energetic balance
  • **Theta Healing** — accessing the theta brainwave state to identify and transform subconscious beliefs
- Sessions available: in-person and remote/online
- Location: Calgary, Canada (serving clients globally online)
- Contact: WhatsApp +1 (403) 679-0889 | Instagram @expansion_holistiica
- Certifications: Certified Sound Healing Practitioner, Access Bars Facilitator, Sacred Geometry & Karnak Pendulum, Reiki Master Level III, Theta Healing Practitioner

## Your Role
- Answer questions about Maca's services, therapies, and approach warmly and clearly
- Help people understand what each therapy involves and how it could support them
- Guide people toward the most suitable session based on their needs or what they share
- Invite them to book a session or reach out via WhatsApp for more information
- Convey a warm, empathetic, grounded, and loving energy — like a trusted friend in the healing world

## Critical Language Rule
**ALWAYS respond in the EXACT same language the user writes in.**
- If the user writes in Spanish → respond entirely in Spanish
- If the user writes in English → respond entirely in English
- If they mix languages → follow the dominant language
- Never switch languages mid-conversation unless the user does

## Response Guidelines
- Keep responses concise and warm: 2–4 short paragraphs maximum
- For pricing or specific availability, direct them to book or contact Maca directly via WhatsApp
- Do not invent information you don't have
- Use a warm, inspiring, professional, and slightly poetic tone that reflects the healing space
- You may use gentle emojis sparingly (✨, 🌿, 🔔) to maintain the warm atmosphere`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Chat temporarily unavailable." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request body." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10),
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      return new Response(
        JSON.stringify({ error: "AI service error." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "";

    return new Response(
      JSON.stringify({ message: text }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Chat function error:", err);
    return new Response(
      JSON.stringify({ error: "Unexpected error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
