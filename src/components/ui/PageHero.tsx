import React from "react";
import Image from "next/image";

interface PageHeroProps {
  kicker: string;
  title: string;
  accentTitle?: string;
  subtitle?: string;
  children?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  kicker,
  title,
  accentTitle,
  subtitle,
  children,
  image,
  imageAlt,
}) => {
  const overImage = Boolean(image);

  return (
    <section
      className={`relative overflow-hidden border-b border-tan/60 ${
        overImage ? "flex min-h-[60vh] items-center" : ""
      }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/75" />
        </>
      )}
      <div
        className={`relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 ${
          overImage ? "py-16 sm:py-24 md:py-32" : "py-12 sm:py-20 md:py-28"
        }`}
      >
        <span
          className={`text-xs font-semibold uppercase tracking-[0.25em] ${
            overImage ? "text-[#E8A47E]" : "text-terracotta"
          }`}
        >
          {kicker}
        </span>
        <h1
          className={`mx-auto mt-3 max-w-4xl font-serif text-3xl font-bold leading-tight tracking-tight text-balance sm:mt-4 sm:text-5xl md:text-6xl ${
            overImage ? "text-cream" : "text-ink"
          }`}
        >
          {accentTitle && (
            <span
              className={`mr-2 font-normal italic ${
                overImage ? "text-[#E8A47E]" : "text-terracotta"
              }`}
            >
              {accentTitle}
            </span>
          )}
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed sm:mt-5 sm:text-base md:text-lg ${
              overImage ? "text-cream/85" : "text-muted"
            }`}
          >
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};