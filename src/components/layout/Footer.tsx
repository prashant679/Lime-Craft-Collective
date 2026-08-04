import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, FileText } from "lucide-react";

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ink text-cream pt-16 pb-12 border-t border-tan/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-tan/20">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group focus:outline-none">
              <span className="font-serif text-2xl font-bold tracking-tight text-cream group-hover:text-terracotta group-focus:text-terracotta transition-colors">
                Lime Craft <span className="font-normal italic text-terracotta">Collective</span>
              </span>
            </Link>
            <p className="text-tan/80 text-sm leading-relaxed max-w-sm">
              Transforming raw concrete into elegant architectural statements. Handcrafted luxury textures (Microtopping & Limewash) for residential and commercial spaces.
            </p>
            <div className="pt-2">
              <a
                href="https://instagram.com/limecraftcollective"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-tan hover:text-cream active:text-terracotta focus:text-cream focus:outline-none transition-colors py-1"
              >
                <InstagramIcon className="w-4 h-4 text-terracotta shrink-0" />
                <span>@limecraftcollective</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-cream tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-tan/80">
              <li>
                <Link
                  href="/"
                  className="inline-block py-1 hover:text-terracotta active:text-terracotta focus:text-terracotta focus:outline-none transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-block py-1 hover:text-terracotta active:text-terracotta focus:text-terracotta focus:outline-none transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services/microtopping"
                  className="inline-block py-1 hover:text-terracotta active:text-terracotta focus:text-terracotta focus:outline-none transition-colors"
                >
                  Microtopping Finishes
                </Link>
              </li>
              <li>
                <Link
                  href="/services/limewash"
                  className="inline-block py-1 hover:text-terracotta active:text-terracotta focus:text-terracotta focus:outline-none transition-colors"
                >
                  Limewash Plasterwork
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="inline-block py-1 hover:text-terracotta active:text-terracotta focus:text-terracotta focus:outline-none transition-colors"
                >
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="inline-block py-1 hover:text-terracotta active:text-terracotta focus:text-terracotta focus:outline-none transition-colors"
                >
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block py-1 hover:text-terracotta active:text-terracotta focus:text-terracotta focus:outline-none transition-colors"
                >
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-cream tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-tan/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-1" />
                <span className="leading-relaxed">F-1/298 Sangam Vihar, New Delhi - 110080</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-terracotta shrink-0" />
                <a
                  href="mailto:limecraftcollective@gmail.com"
                  className="py-1 hover:text-terracotta active:text-terracotta focus:text-terracotta focus:outline-none transition-colors break-all"
                >
                  limecraftcollective@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-terracotta shrink-0" />
                <a
                  href="tel:+918586096452"
                  className="py-1 hover:text-terracotta active:text-terracotta focus:text-terracotta focus:outline-none transition-colors"
                >
                  +91 8586096452
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/918586096452"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 hover:text-terracotta active:text-terracotta focus:text-terracotta focus:outline-none transition-colors"
                >
                  WhatsApp Direct Chat
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Business Details / GST */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-cream tracking-wide">
              Business Information
            </h3>
            <div className="p-4 rounded-sm border border-tan/20 bg-cream/5 space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-tan font-medium">
                <FileText className="w-3.5 h-3.5 text-terracotta shrink-0" />
                <span>GST Registration</span>
              </div>
              <p className="text-sm font-mono text-cream font-semibold tracking-wider">
                07CZUPR8920H1ZK
              </p>
              <p className="text-xs text-tan/70 leading-relaxed">
                Registered decorative surfacing & plasterwork contractor.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-tan/70">
          <p>© {new Date().getFullYear()} Lime Craft Collective. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Handcrafted Microtopping & Limewash Finishes • Delhi NCR & Beyond
          </p>
        </div>
      </div>
    </footer>
  );
};
