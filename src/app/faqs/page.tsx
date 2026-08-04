import React from "react";
import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { SITE } from "@/components/layout/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about microtopping and limewash finishes — application, maintenance, cost, and service area.",
};

const faqs = [
  {
    question: "What is microtopping and how is it different from regular concrete flooring?",
    answer:
      "Microtopping is an ultra-thin (up to 3mm) decorative concrete coating applied over existing floors or walls, creating a seamless, joint-free surface. Unlike traditional concrete, it requires no demolition and doesn't change floor levels.",
  },
  {
    question: "What's the difference between Microtopping and Limewash?",
    answer:
      "Microtopping is a concrete-based coating suited to both floors and walls with a sleek, modern finish. Limewash is a pure-limestone plaster finish, typically for walls, prized for its natural texture, breathability, and antique character.",
  },
  {
    question: "Can these finishes be applied over my existing floors and walls?",
    answer:
      "In most cases, yes — both microtopping and limewash are designed to apply directly over sound existing surfaces without demolition. A site visit or consultation will confirm suitability for your specific space.",
  },
  {
    question: "Are these finishes suitable for bathrooms and wet areas?",
    answer:
      "Yes — microtopping in particular is built for water, wear, and stain resistance, making it well suited to bathrooms and high-moisture spaces.",
  },
  {
    question: "What colors and textures are available?",
    answer:
      "A wide, fully customizable palette from muted earth tones to bold modern hues, in Smooth, Semi-Rough, and Rough textures for microtopping, plus signature Limewash finishes like Liquid Metal, Lime Crumbled, Lime Rustic, and Lime Silk.",
  },
  {
    question: "How do I maintain these surfaces?",
    answer:
      "Regular sweeping or vacuuming, occasional cleaning with a damp cloth and pH-neutral detergent, prompt spill wipe-up, and occasional protective treatments all help preserve the finish for years.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Timelines vary by project size and finish type. Share a few details about your space and we'll give you a realistic estimate for your project.",
  },
  {
    question: "What does it cost?",
    answer:
      "Because every project is custom — surface condition, size, finish, and color all affect pricing — we provide quotes after understanding your specific space. Reach out via the contact form or WhatsApp for a personalized estimate.",
  },
  {
    question: "Do you work on both residential and commercial projects?",
    answer:
      "Yes — our work spans both residential interiors and commercial spaces.",
  },
  {
    question: "Which cities and areas do you serve?",
    answer:
      "We're based in Delhi NCR and work across the region and beyond. Get in touch and we'll confirm coverage for your location.",
  },
];

export default function FaqsPage() {
  return (
    <div>
      <PageHero
        kicker="FAQs"
        title="Questions, Answered"
        subtitle="Everything a first-time client typically asks before starting a decorative concrete or limewash project."
        image="/images/pdf/philosophy.jpg"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="pb-8 md:pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-base text-muted">
            Still have a question? We&apos;re happy to talk it through.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button href={SITE.whatsappUrl} variant="terracotta" size="md">
              Ask on WhatsApp
            </Button>
            <Button href="/contact" variant="outline" size="md">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}