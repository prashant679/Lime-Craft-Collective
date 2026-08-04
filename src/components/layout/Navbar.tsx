"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/components/layout/site";

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);

  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const servicesRef = useRef<HTMLDivElement>(null);

  const isServicesActive = pathname.startsWith("/services");

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(true);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-tan/60 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link
            href="/"
            onClick={() => {
              setMobileOpen(false);
              setServicesOpen(false);
            }}
            className="group shrink-0 focus:outline-none"
            aria-label={`${SITE.name} – Home`}
          >
            <span className="block font-serif text-xl font-bold leading-none tracking-tight text-ink transition-colors group-hover:text-terracotta sm:text-2xl">
              Lime Craft{" "}
              <span className="font-normal italic text-terracotta">Collective</span>
            </span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.25em] text-muted sm:text-[10px]">
              Handcrafted Textures
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              if (link.children) {
                return (
                  <div
                    key={link.href}
                    ref={servicesRef}
                    className="relative flex items-center"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="flex items-center gap-0.5">
                      <Link
                        href={link.href}
                        aria-current={isServicesActive ? "page" : undefined}
                        className={`py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:text-terracotta ${
                          isServicesActive ? "text-terracotta" : "text-ink hover:text-terracotta"
                        }`}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((prev) => !prev)}
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                        aria-label={`Open ${link.label} menu`}
                        className={`p-1 transition-colors focus:outline-none focus-visible:text-terracotta ${
                          servicesOpen ? "text-terracotta" : "text-muted hover:text-terracotta"
                        }`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {servicesOpen && (
                      <div className="absolute left-0 top-full pt-3">
                        <ul className="w-48 rounded-[4px] border border-tan/80 bg-cream py-2 shadow-lg">
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setServicesOpen(false)}
                                aria-current={pathname === child.href ? "page" : undefined}
                                className={`block px-4 py-2.5 text-sm transition-colors focus:outline-none focus-visible:bg-tan/20 ${
                                  pathname === child.href
                                    ? "bg-tan/30 text-terracotta"
                                    : "text-ink hover:bg-tan/20 hover:text-terracotta"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:text-terracotta ${
                    isActive ? "text-terracotta" : "text-ink hover:text-terracotta"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={SITE.whatsappUrl}
              variant="terracotta"
              size="sm"
              className="hidden sm:inline-flex"
              icon={<MessageCircle className="h-4 w-4" />}
            >
              Get in Touch
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex items-center justify-center p-2 text-ink transition-colors hover:text-terracotta focus:outline-none focus-visible:text-terracotta lg:hidden"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-tan/60 bg-cream lg:hidden">
          <nav
            className="mx-auto max-w-7xl overflow-y-auto px-4 sm:px-6"
            style={{ maxHeight: "calc(100vh - 80px)" }}
            aria-label="Mobile"
          >
            <ul className="py-4">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <li key={link.href} className="border-b border-tan/40">
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={() => {
                            setMobileOpen(false);
                            setServicesOpen(false);
                          }}
                          className={`py-3 text-lg font-medium transition-colors ${
                            isServicesActive ? "text-terracotta" : "text-ink"
                          }`}
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen((prev) => !prev)}
                          aria-expanded={mobileServicesOpen}
                          aria-label={`Toggle ${link.label} sub-menu`}
                          className="p-2 text-ink transition-colors hover:text-terracotta focus:outline-none focus-visible:text-terracotta"
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                      {mobileServicesOpen && (
                        <ul className="ml-3 border-l-2 border-tan/50 pl-4 pb-3">
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setServicesOpen(false);
                                }}
                                className={`block py-2.5 text-base transition-colors ${
                                  pathname === child.href
                                    ? "text-terracotta"
                                    : "text-ink/80 hover:text-terracotta"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <li key={link.href} className="border-b border-tan/40">
                    <Link
                      href={link.href}
                      onClick={() => {
                        setMobileOpen(false);
                        setServicesOpen(false);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={`block py-3 text-lg font-medium transition-colors ${
                        isActive ? "text-terracotta" : "text-ink hover:text-terracotta"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="py-5">
              <Button
                href={SITE.whatsappUrl}
                variant="terracotta"
                size="lg"
                className="w-full justify-center"
                icon={<MessageCircle className="h-5 w-5" />}
              >
                Chat on WhatsApp ({SITE.phoneDisplay})
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};