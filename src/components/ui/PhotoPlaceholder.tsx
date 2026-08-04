import React from "react";

interface PhotoPlaceholderProps {
  label?: string;
  aspect?: "16/9" | "3/2" | "4/5" | "square";
  tone?: "terracotta" | "olive" | "ink" | "tan";
  className?: string;
}

const aspectClasses: Record<string, string> = {
  "16/9": "aspect-video",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  square: "aspect-square",
};

const toneGradients: Record<string, string> = {
  terracotta: "bg-gradient-to-br from-[#C1592E] to-[#8E3E1D]",
  olive: "bg-gradient-to-br from-[#7C8266] to-[#565C45]",
  ink: "bg-gradient-to-br from-[#1F1A15] to-[#3d3329]",
  tan: "bg-gradient-to-br from-[#D8CBB8] to-[#b7a68d]",
};

export const PhotoPlaceholder: React.FC<PhotoPlaceholderProps> = ({
  label = "Project photography",
  aspect = "3/2",
  tone = "olive",
  className = "",
}) => {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex items-end overflow-hidden ${aspectClasses[aspect]} ${toneGradients[tone]} ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(247,243,232,0.18),transparent_55%)]" />
      <span className="relative p-4 text-xs uppercase tracking-[0.25em] text-cream/90 mix-blend-multiply sm:p-6">
        {label}
      </span>
    </div>
  );
};