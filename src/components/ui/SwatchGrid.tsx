"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export interface Swatch {
  name: string;
  finish?: string;
  tone: "terracotta" | "olive" | "ink" | "tan";
  image?: string;
}

interface SwatchGridProps {
  swatches: Swatch[];
}

export const SwatchGrid: React.FC<SwatchGridProps> = ({ swatches }) => {
  const [active, setActive] = useState<Swatch | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {swatches.map((swatch) => (
          <button
            key={swatch.name}
            type="button"
            onClick={() => setActive(swatch)}
            className="group text-left focus:outline-none"
            aria-label={`Preview ${swatch.name}${swatch.finish ? ` — ${swatch.finish}` : ""}`}
          >
            <div className="relative overflow-hidden rounded-[4px] border border-tan/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-terracotta/50">
              {swatch.image ? (
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={swatch.image}
                    alt={swatch.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <PhotoPlaceholder
                  label={swatch.name}
                  aspect="square"
                  tone={swatch.tone}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-left">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-cream/80">
                  {swatch.finish}
                </span>
                <span className="block font-serif text-lg font-semibold text-cream">
                  {swatch.name}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} preview`}
        >
          <div
            className="w-full max-w-lg rounded-[4px] bg-cream p-4 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-semibold text-ink">{active.name}</h3>
                {active.finish && (
                  <p className="text-xs uppercase tracking-wider text-muted">{active.finish}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close preview"
                className="p-2 text-ink transition-colors hover:text-terracotta focus:outline-none focus-visible:text-terracotta"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative overflow-hidden rounded-[4px] border border-tan/60">
              {active.image ? (
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={active.image}
                    alt={`${active.name} enlarged preview`}
                    fill
                    sizes="(min-width: 512px) 512px, 100vw"
                    className="object-cover rounded-[3px]"
                  />
                </div>
              ) : (
                <PhotoPlaceholder
                  label={`${active.name} enlarged preview`}
                  aspect="square"
                  tone={active.tone}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};