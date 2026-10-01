import { useEffect, useRef } from 'react';
import { Download, Share2, X } from 'lucide-react';

interface Props {
  imageUrl: string | null;
  filename: string;
  alt: string;
  canShareFile: boolean;
  onNativeShare: () => void;
  onClose: () => void;
  labels: { title: string; share: string; download: string; hint: string; close: string; generating: string };
}

export default function ShareStoryModal({ imageUrl, filename, alt, canShareFile, onNativeShare, onClose, labels }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Foco dentro de la ventana, Escape para cerrar, Tab que no se escapa, sin scroll de fondo
  // y devolver el foco al botón que la abrió.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href]');
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-clay-500/60 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-story-title"
        className="relative w-full max-w-sm max-h-[92vh] overflow-y-auto rounded-3xl bg-cream border border-sand-300 shadow-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-clay-500 hover:bg-sand-200 transition-colors"
        >
          <X size={18} />
        </button>
        <h2 id="share-story-title" className="font-serif text-2xl text-clay-500 pr-10 mb-4">
          {labels.title}
        </h2>

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={alt}
            width={1080}
            height={1920}
            data-story-image
            className="w-full max-h-[56vh] object-contain rounded-2xl border border-sand-300 bg-sand-100 mx-auto"
          />
        ) : (
          <p className="font-sans text-sm text-clay-400 text-center py-16" role="status">
            {labels.generating}
          </p>
        )}

        <p className="font-sans text-xs text-clay-400 leading-relaxed mt-4">{labels.hint}</p>

        {imageUrl && (
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            {canShareFile && (
              <button type="button" onClick={onNativeShare} className="btn-primary justify-center font-bold" data-story-share>
                <Share2 size={15} />
                {labels.share}
              </button>
            )}
            <a
              href={imageUrl}
              download={filename}
              className={`${canShareFile ? 'btn-secondary' : 'btn-primary font-bold'} justify-center`}
              data-story-download
            >
              <Download size={15} />
              {labels.download}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
