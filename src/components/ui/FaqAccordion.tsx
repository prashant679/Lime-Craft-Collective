"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface Faq {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: Faq[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-tan/60 border-y border-tan/60">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${idx}`}
                className="flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:text-terracotta"
              >
                <span
                  className={`font-serif text-lg font-semibold transition-colors sm:text-xl ${
                    isOpen ? "text-terracotta" : "text-ink"
                  }`}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-terracotta" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={`faq-panel-${idx}`}
                role="region"
                aria-label={faq.question}
                className="pb-6 pr-10 text-base leading-relaxed text-muted"
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};