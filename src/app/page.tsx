import React from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckList } from "@/components/ui/CheckList";
import { MessageCircle, ArrowRight, ShieldCheck, Sparkles, Layers } from "lucide-react";

export default function Home() {
  const philosophyPoints = [
    {
      title: "Environmentally Responsible Materials",
      description: "Low-VOC, sustainable mineral plasters and eco-conscious concrete formulations.",
    },
    {
      title: "Exceptional Quality & Transparent Pricing",
      description: "Craftsmanship backed by honest project estimates with zero hidden costs.",
    },
    {
      title: "Continuous Innovation",
      description: "Constantly refining techniques to deliver modern, long-lasting surface artistry.",
    },
    {
      title: "Social & Material Responsibility",
      description: "Bespoke architectural finishes created with care for craftsmen and clients alike.",
    },
  ];

  return (
    <div className="space-y-20 py-12 md:py-20">
      {/* Hero Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/60 border border-tan/60 rounded-sm p-8 md:p-16 text-center space-y-6 shadow-xs">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold font-sans">
            Lime Craft Collective
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink font-bold leading-tight max-w-4xl mx-auto">
            Handcrafted <span className="font-normal italic text-terracotta">Luxury Textures</span>
          </h1>
          <p className="text-muted text-base md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
            Transforming raw concrete into elegant architectural statements across residential and commercial spaces.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              href="https://wa.me/918586096452"
              variant="primary"
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Get a Quote on WhatsApp
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore Our Services
            </Button>
          </div>
        </div>
      </section>

      {/* Component Demo Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Our Philosophy"
          accentTitle="Crafted"
          title="with Purpose & Precision"
          subtitle="We blend luxury aesthetics with durability and material integrity to redefine surface design."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 bg-white/40 p-6 md:p-8 rounded-sm border border-tan/40">
            <h3 className="font-serif text-2xl text-ink font-semibold">
              Core Principles
            </h3>
            <CheckList items={philosophyPoints} columns={1} circleVariant="ink" />
          </div>

          <div className="space-y-6 bg-white/40 p-6 md:p-8 rounded-sm border border-tan/40">
            <h3 className="font-serif text-2xl text-ink font-semibold">
              Button System & Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="md">
                Primary Button
              </Button>
              <Button variant="secondary" size="md">
                Secondary Button
              </Button>
              <Button variant="outline" size="md">
                Outline Button
              </Button>
              <Button
                variant="whatsapp"
                size="md"
                href="https://wa.me/918586096452"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                WhatsApp Direct
              </Button>
            </div>
            <p className="text-sm text-muted">
              Built with consistent color variables (`--color-terracotta`, `--color-ink`, `--color-tan`) matching `docs/02-design.md`.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
