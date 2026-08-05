"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
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
  "w-full max-w-full rounded-lg border border-tan/70 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30";

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedMessage = `New inquiry from website:
Name: ${form.name.trim()}
Email: ${form.email.trim()}
Phone: ${form.phone.trim()}
Message: ${form.message.trim()}`;

    const whatsappUrl = `https://wa.me/918586096452?text=${encodeURIComponent(formattedMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-full overflow-hidden rounded-2xl border border-tan/60 bg-white/70 p-5 sm:p-8 md:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink">
            Name <span className="text-terracotta">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink">
            Phone Number <span className="text-terracotta">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 8586096452"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink">
          Email Address <span className="text-[10px] lowercase text-muted">(optional)</span>
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
        <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink">
          How Can We Help? <span className="text-terracotta">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project — surface type, estimated area, location, and finish preferences."
          className={`${inputClasses} resize-y`}
        />
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          variant="terracotta"
          size="lg"
          className="w-full sm:w-auto"
          icon={<MessageCircle className="h-5 w-5" />}
        >
          Send Message
        </Button>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-muted">
        Submitting opens WhatsApp with your prefilled details so we can chat with you directly. Prefer email? Write to{" "}
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