import React from "react";

interface SectionHeadingProps {
  /** Small uppercase kicker/category tag above title */
  kicker?: string;
  /** First part of title to emphasize with bold serif / accent color */
  accentTitle?: string;
  /** Second part of title in standard weight */
  title: string;
  /** Optional subtitle or description text below title */
  subtitle?: string;
  /** Alignment of heading */
  align?: "left" | "center";
  /** Whether to display thin horizontal rule divider under section header */
  showDivider?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  accentTitle,
  title,
  subtitle,
  align = "left",
  showDivider = true,
  className = "",
}) => {
  const isCentered = align === "center";

  return (
    <div className={`mb-8 md:mb-12 ${isCentered ? "text-center" : "text-left"} ${className}`}>
      {kicker && (
        <span className="block text-xs uppercase tracking-[0.2em] font-sans font-semibold text-terracotta mb-2">
          {kicker}
        </span>
      )}

      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight tracking-tight">
        {accentTitle && (
          <span className="font-bold text-terracotta mr-2 font-serif">
            {accentTitle}
          </span>
        )}
        <span className="font-normal">{title}</span>
      </h2>

      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-muted font-sans max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

      {showDivider && (
        <div
          className={`mt-4 h-[1px] bg-tan ${
            isCentered ? "mx-auto w-24 md:w-32" : "w-20 md:w-28"
          }`}
        />
      )}
    </div>
  );
};
