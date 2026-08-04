"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll state for compact header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically close mobile menu and dropdown when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Services",
      href: "/services",
      isDropdown: true,
      dropdownItems: [
        { label: "Microtopping", href: "/services/microtopping" },
        { label: "Limewash", href: "/services/limewash" },
      ],
    },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-xs border-b border-tan/60 py-3"
          : "bg-cream/90 backdrop-blur-sm border-b border-tan/30 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 shrink-0">
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-ink group-hover:text-terracotta transition-colors">
                Lime Craft <span className="font-normal italic text-terracotta">Collective</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-muted font-sans font-medium">
                Handcrafted Textures
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Large Screens >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                const isServicesActive = pathname.startsWith("/services");
                return (
                  <div
                    key={link.label}
                    ref={dropdownRef}
                    className="relative py-2"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <div className="inline-flex items-center gap-1">
                      <Link
                        href="/services"
                        className={`text-sm font-sans font-medium transition-colors ${
                          isServicesActive
                            ? "text-terracotta font-semibold"
                            : "text-ink hover:text-terracotta"
                        }`}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setServicesDropdownOpen((prev) => !prev);
                        }}
                        className="p-1 text-ink hover:text-terracotta transition-colors focus:outline-none"
                        aria-expanded={servicesDropdownOpen}
                        aria-label="Toggle Services dropdown"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            servicesDropdownOpen ? "rotate-180 text-terracotta" : "text-muted"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Dropdown Menu Overlay */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-52 pt-2 z-50 before:absolute before:-top-2 before:left-0 before:w-full before:h-3">
                        <div className="bg-cream border border-tan/80 shadow-lg rounded-sm py-2 overflow-hidden">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setServicesDropdownOpen(false)}
                              className={`block px-4 py-2.5 text-sm font-sans transition-colors ${
                                pathname === item.href
                                  ? "bg-tan/30 text-terracotta font-medium"
                                  : "text-ink hover:bg-tan/20 hover:text-terracotta"
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-sans font-medium transition-colors py-2 ${
                    isActive ? "text-terracotta font-semibold" : "text-ink hover:text-terracotta"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA (Large Screens >= 1024px) */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Button
              href="https://wa.me/918586096452"
              variant="terracotta"
              size="sm"
              icon={<MessageCircle className="w-4 h-4" />}
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile & Tablet Toggle Controls (< 1024px) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              href="https://wa.me/918586096452"
              variant="terracotta"
              size="sm"
              className="px-2.5 py-1.5 text-[11px] xs:text-xs"
              icon={<MessageCircle className="w-3.5 h-3.5" />}
            >
              WhatsApp
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-sm text-ink hover:text-terracotta hover:bg-tan/20 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-terracotta" /> : <Menu className="w-6 h-6 text-ink" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Full Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-xl border-b border-tan/60 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto z-50">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                const isServicesActive = pathname.startsWith("/services");
                return (
                  <div key={link.label} className="space-y-2 py-1">
                    <div className="flex items-center justify-between py-2 border-b border-tan/30">
                      <Link
                        href="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-lg font-sans font-medium ${
                          isServicesActive ? "text-terracotta font-semibold" : "text-ink"
                        }`}
                      >
                        Services
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                        className="p-2 text-ink hover:text-terracotta focus:outline-none"
                        aria-label="Toggle sub-services menu"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180 text-terracotta" : "text-muted"
                          }`}
                        />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="pl-4 space-y-2 border-l-2 border-tan/50 ml-2 py-1">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block py-2 text-base font-sans rounded-sm transition-colors ${
                              pathname === item.href
                                ? "text-terracotta font-semibold"
                                : "text-ink/80 hover:text-terracotta"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 text-lg font-sans border-b border-tan/30 transition-colors ${
                    isActive ? "text-terracotta font-semibold" : "text-ink hover:text-terracotta"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 space-y-3">
              <Button
                href="https://wa.me/918586096452"
                variant="terracotta"
                size="lg"
                className="w-full justify-center"
                icon={<MessageCircle className="w-5 h-5" />}
              >
                Chat on WhatsApp (+91 8586096452)
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
