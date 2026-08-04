import React from "react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/components/layout/site";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  title = "Ready to transform your space?",
  subtitle = "Tell us about your project and get a personalised estimate — no obligation.",
}) => {
  return (
    <section className="py-12 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[4px] border border-tan/60 bg-white/60 px-5 py-10 text-center shadow-xs sm:px-12 md:py-20">
          <h2 className="mx-auto max-w-2xl font-serif text-2xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base md:text-lg">
            {subtitle}
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <Button href={SITE.whatsappUrl} variant="terracotta" size="lg" className="w-full sm:w-auto">
              Get in Touch on WhatsApp
            </Button>
            <Button href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};