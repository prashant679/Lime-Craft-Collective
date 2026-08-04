import React from "react";
import { Check } from "lucide-react";

interface CheckListProps {
  items?: (string | { title?: string; description: string })[];
  columns?: 1 | 2;
  children?: React.ReactNode;
  className?: string;
  circleVariant?: "ink" | "terracotta" | "olive";
}

export const CheckList: React.FC<CheckListProps> = ({
  items,
  columns = 1,
  children,
  className = "",
  circleVariant = "ink",
}) => {
  const circleColorStyles = {
    ink: "bg-ink text-cream",
    terracotta: "bg-terracotta text-cream",
    olive: "bg-olive text-cream",
  };

  const gridClass = columns === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" : "space-y-4";

  if (children) {
    return <ul className={`${gridClass} ${className}`}>{children}</ul>;
  }

  if (!items || items.length === 0) return null;

  return (
    <ul className={`${gridClass} ${className}`}>
      {items.map((item, idx) => {
        const isObject = typeof item !== "string";
        const title = isObject ? item.title : undefined;
        const description = isObject ? item.description : item;

        return (
          <li key={idx} className="flex items-start gap-3">
            <span
              className={`inline-flex shrink-0 items-center justify-center w-6 h-6 rounded-full mt-0.5 shadow-xs ${circleColorStyles[circleVariant]}`}
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <div className="text-base text-ink font-sans leading-relaxed">
              {title && <span className="font-semibold block text-ink">{title}</span>}
              <span className={title ? "text-muted text-sm" : ""}>{description}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
