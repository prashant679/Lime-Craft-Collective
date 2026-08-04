"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/components/layout/site";

export const MobileFloatingCTA: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6">
      <a
        href={SITE.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Lime Craft Collective on WhatsApp"
        className="group flex items-center gap-2.5 rounded-full bg-terracotta px-4 py-3 text-cream shadow-lg transition-all duration-300 hover:bg-[#A64A24] hover:shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-terracotta/50"
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
          <MessageCircle className="h-4 w-4 stroke-[2.2]" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider sm:text-sm">
          <span className="inline sm:hidden">WhatsApp</span>
          <span className="hidden sm:inline">Chat on WhatsApp</span>
        </span>
      </a>
    </div>
  );
};

export const FloatingWhatsAppCTA = MobileFloatingCTA;
