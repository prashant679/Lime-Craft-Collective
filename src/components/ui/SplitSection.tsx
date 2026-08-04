import React from "react";

interface SplitSectionProps {
  kicker?: string;
  accentTitle?: string;
  title: string;
  subtitle?: string;
  image: React.ReactNode;
  imageSide?: "left" | "right";
  children?: React.ReactNode;
  className?: string;
}

export const SplitSection: React.FC<SplitSectionProps> = ({
  kicker,
  accentTitle,
  title,
  subtitle,
  image,
  imageSide = "left",
  children,
  className = "",
}) => {
  const reversed = imageSide === "right";

  return (
    <section className={`py-12 sm:py-18 md:py-24 lg:py-28 ${className}`}>
      <div
        className={`mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>{image}</div>

        <div>
          {kicker && (
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">
              {kicker}
            </span>
          )}
          <h2 className="mt-2 font-serif text-2xl font-normal leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
            {accentTitle && (
              <span className="mr-2 font-bold text-terracotta">{accentTitle}</span>
            )}
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base md:text-lg">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};