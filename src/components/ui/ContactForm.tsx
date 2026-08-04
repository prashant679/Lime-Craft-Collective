"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/components/layout/site";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialForm: FormState = { name: "", email: "", phone: "", message: "" };

const inputClasses =
  "w-full rounded-[4px] border border-tan/70 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30";

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sent, setSent] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = `Hello Lime Craft Collective, my name is ${form.name}.\n\n${form.message}\n\nYou can reach me at ${form.email || form.phone || "—"}.`;
    window.open(`${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-[4px] border border-tan/60 bg-white/70 p-10 text-center">
        <h3 className="font-serif text-2xl font-semibold text-ink">
          Thank you, {form.name || "friend"}!
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">
          We&apos;ve opened WhatsApp with your message so we can chat directly. If it
          didn&apos;t open, just message us at{" "}
          <span className="font-semibold">{SITE.phoneDisplay}</span>.
        </p>
        <div className="mt-6">
          <Button href={SITE.whatsappUrl} variant="terracotta" size="md">
            Open WhatsApp Chat
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[4px] border border-tan/60 bg-white/70 p-8 md:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 ..."
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={inputClasses}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project — surface, finish, and any questions."
          className={`${inputClasses} resize-y`}
        />
      </div>

      <div className="mt-6">
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
          Send via WhatsApp
        </Button>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Submitting opens WhatsApp with your message prefilled, so we can reply to you
        directly. Prefer email? Write to{" "}
        <a
          href={SITE.emailHref}
          className="text-terracotta hover:underline focus:outline-none focus-visible:underline"
        >
          {SITE.email}
        </a>
        .
      </p>
    </form>
  );
};