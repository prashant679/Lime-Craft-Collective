import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "whatsapp" | "outline" | "terracotta";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  icon,
  children,
  className = "",
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed tracking-wide";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs uppercase tracking-wider rounded-sm gap-1.5",
    md: "px-6 py-3 text-sm rounded-sm gap-2",
    lg: "px-8 py-4 text-base rounded-sm gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-terracotta text-cream hover:bg-[#A64A24] active:bg-[#8E3E1D] shadow-sm hover:shadow-md",
    terracotta:
      "bg-terracotta text-cream hover:bg-[#A64A24] active:bg-[#8E3E1D] shadow-sm hover:shadow-md",
    secondary:
      "border border-ink/30 text-ink bg-transparent hover:bg-ink hover:text-cream active:bg-ink/90",
    outline:
      "border border-tan text-ink hover:border-terracotta hover:text-terracotta bg-transparent",
    whatsapp:
      "bg-[#25D366] text-white hover:bg-[#20BD5A] shadow-sm hover:shadow-md font-semibold",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

  const content = (
    <>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("https") || href.startsWith("wa.me");
    return (
      <Link
        href={href}
        target={target || (isExternal ? "_blank" : undefined)}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
        className={combinedClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
