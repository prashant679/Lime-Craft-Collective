import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FileText, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/components/layout/site";

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

const linkClasses =
  "inline-block py-1 text-tan/85 transition-colors hover:text-terracotta focus:outline-none focus-visible:text-cream";

interface FooterProps {
  logoUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({ logoUrl }) => {
  return (
    <footer className="bg-ink font-sans text-cream">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-tan/20 pb-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="space-y-5">
            <Link href="/" className="group inline-block focus:outline-none">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={SITE.name}
                  width={196}
                  height={48}
                  className="h-12 w-auto object-contain transition-opacity group-hover:opacity-90"
                />
              ) : (
                <span className="font-serif text-2xl font-bold tracking-tight text-cream transition-colors group-hover:text-terracotta">
                  Lime Craft{" "}
                  <span className="font-normal italic text-terracotta">Collective</span>
                </span>
              )}
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-tan/85">
              Handcrafted micro concrete and limewash finishes for residential and commercial
              spaces — transforming raw concrete into elegant architectural statements.
            </p>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-tan transition-colors hover:text-cream focus:outline-none focus-visible:text-cream"
            >
              <InstagramIcon className="h-4 w-4 shrink-0 text-terracotta" />
              {SITE.instagramHandle}
            </a>
          </div>

          <div className="space-y-5">
            <h2 className="font-serif text-lg font-semibold">Navigation</h2>
            <ul className="space-y-1.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                  {link.children && (
                    <ul className="ml-3 mt-1 space-y-1.5 border-l border-tan/30 pl-4">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className={linkClasses}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h2 className="font-serif text-lg font-semibold">Contact</h2>
            <ul className="space-y-3.5 text-sm text-tan/85">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                <span className="leading-relaxed">{SITE.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                <a href={SITE.emailHref} className="break-all transition-colors hover:text-terracotta">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                <a href={SITE.phoneHref} className="transition-colors hover:text-terracotta">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366]" aria-hidden="true" />
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-terracotta"
                >
                  WhatsApp Direct Chat
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h2 className="font-serif text-lg font-semibold">Business Information</h2>
            <div className="rounded-[4px] border border-tan/25 bg-cream/5 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-tan">
                <FileText className="h-3.5 w-3.5 shrink-0 text-terracotta" aria-hidden="true" />
                GST Registration
              </div>
              <p className="mt-2 font-mono text-sm font-semibold tracking-wider">
                {SITE.gstNumber}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-tan/75">
                Registered decorative surfacing &amp; plasterwork contractor.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-tan/75 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Handcrafted Micro Concrete &amp; Limewash Finishes &bull; Delhi NCR &amp; Beyond
          </p>
        </div>
      </div>
    </footer>
  );
};