// src/components/Gallery.jsx
import React, { useEffect, useState } from "react";

export default function Gallery({ images = [], showThumbs = true, initialIndex = 0 }) {
  const [idx, setIdx] = useState(initialIndex);
  const [open, setOpen] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  const clamp = (n) => ((n % images.length) + images.length) % images.length;
  const next = () => setIdx((i) => clamp(i + 1));
  const prev = () => setIdx((i) => clamp(i - 1));

  // Keyboard navigation when lightbox is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="w-full">
      {/* Main slide (cropped for layout; click to open full-size) */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10">
        <img
          src={images[idx]}
          alt=""
          className="w-full h-64 md:h-80 object-cover cursor-zoom-in"
          onClick={() => setOpen(true)}
          loading="lazy"
        />

        {/* Simple prev/next controls (desktop) */}
        <button
          onClick={prev}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 rounded-lg bg-black/50 px-3 py-2 hover:bg-black/70"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-black/50 px-3 py-2 hover:bg-black/70"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Thumbnails */}
      {showThumbs && images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setIdx(i)}
              className={`relative h-14 w-20 flex-shrink-0 rounded-lg overflow-hidden border ${
                i === idx ? "border-fuchsia-400" : "border-white/15"
              }`}
              aria-label={`Slide ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox (full-size, no cropping) */}
      {open && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          {/* Stop propagation so clicking the image/controls doesn't close */}
          <div className="relative max-w-[95vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[idx]}
              alt=""
              className="max-w-[95vw] max-h-[90vh] object-contain"
              loading="eager"
            />

            {/* Controls in lightbox */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg bg-black/60 px-3 py-2 hover:bg-black/80"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-black/60 px-3 py-2 hover:bg-black/80"
              aria-label="Next"
            >
              ›
            </button>
            <button
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 rounded-lg bg-black/60 px-3 py-2 hover:bg-black/80"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
