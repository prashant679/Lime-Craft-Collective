"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileFloatingCTA } from "@/components/ui/MobileFloatingCTA";

interface LayoutWrapperProps {
  children: React.ReactNode;
  logoUrl?: string;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  logoUrl,
}) => {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <div className="h-screen w-screen overflow-hidden">{children}</div>;
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-terracotta focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <Navbar logoUrl={logoUrl} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer logoUrl={logoUrl} />
      <MobileFloatingCTA />
    </>
  );
};
