import React from "react";
import { Metadata } from "next";
import { FileText, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { SITE } from "@/components/layout/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Lime Craft Collective for micro concrete, limewash, textured finishes, and terrazzo flooring — WhatsApp, email, or call. Delhi NCR & beyond.",
};

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const infoItems = [
  {
    icon: MapPin,
    label: "Address",
    children: <span className="leading-relaxed">{SITE.address}</span>,
  },
  {
    icon: Mail,
    label: "Email",
    children: (
      <a href={SITE.emailHref} className="break-all transition-colors hover:text-terracotta">
        {SITE.email}
      </a>
    ),
  },
  {
    icon: Phone,
    label: "Phone",
    children: (
      <a href={SITE.phoneHref} className="transition-colors hover:text-terracotta">
        {SITE.phoneDisplay}
      </a>
    ),
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    children: (
      <a
        href={SITE.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-terracotta"
      >
        Chat with us directly
      </a>
    ),
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    children: (
      <a
        href={SITE.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-terracotta"
      >
        {SITE.instagramHandle}
      </a>
    ),
  },
  {
    icon: FileText,
    label: "GST Number",
    children: <span className="font-mono tracking-wider">{SITE.gstNumber}</span>,
  },
];

export default function ContactPage() {
  return (
    <div>
      <PageHero
        kicker="Contact Us"
        title="Let's Talk About Your Project"
        subtitle="A quick message is all it takes to start. Tell us about your space and we'll help you choose the right finish."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <aside className="space-y-10 lg:col-span-2">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-ink">Contact Details</h2>
              <ul className="space-y-5 text-sm text-muted">
                {infoItems.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-cream">
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-xs font-medium uppercase tracking-wider text-ink">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block">{item.children}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[4px] border border-tan/60 bg-white/50 p-6">
              <h2 className="font-serif text-xl font-semibold text-ink">Service Area</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Based in Delhi NCR, we work across the region and beyond on residential and
                commercial projects.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}