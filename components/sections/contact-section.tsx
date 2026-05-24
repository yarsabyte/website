"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { GradientText } from "@/components/ui/gradient-text";
import { SectionHeading } from "@/components/ui/section-heading";

type FormState = {
  name: string;
  brandName: string;
  contactNumber: string;
  serviceNeeded: string;
  budgetRange: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  brandName: "",
  contactNumber: "",
  serviceNeeded: "",
  budgetRange: "",
  message: "",
};

export function ContactSection() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const servicesList = [
    { value: "website", label: "Website Development" },
    { value: "portfolio", label: "Portfolio Website" },
    { value: "posters", label: "Social Media Posters" },
    { value: "reels", label: "Video Editing / Reels" },
    { value: "branding", label: "Brand Identity & Logo" },
    { value: "launch", label: "Full Digital Launch Setup" },
    { value: "other", label: "Other / Custom Request" },
  ];

  const budgetsList = [
    { value: "under-25k", label: "Under NRs. 25,000" },
    { value: "25k-50k", label: "NRs. 25,000 - 50,000" },
    { value: "50k-100k", label: "NRs. 50,000 - 1,00,000" },
    { value: "100k-250k", label: "NRs. 1,00,000 - 2,50,000" },
    { value: "250k-plus", label: "NRs. 2,50,000+" },
    { value: "custom", label: "Custom / Discuss Later" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field when typing
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const tempErrors: Partial<Record<keyof FormState, string>> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.contactNumber.trim()) {
      tempErrors.contactNumber = "Phone or WhatsApp number is required";
    }
    if (!formData.serviceNeeded) tempErrors.serviceNeeded = "Please select a service";
    if (!formData.budgetRange) tempErrors.budgetRange = "Please select a budget range";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate backend submission delay
    // TODO: Connect this form later using EmailJS, Resend, or a Next.js API route.
    // Example Integration Details are documented in walkthrough.md
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section 
      id="contact" 
      className="section-spacing border-t border-foreground/10 bg-background relative overflow-hidden"
    >
      {/* Visual background accents */}
      <div 
        className="absolute -right-48 -bottom-48 size-[35rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_70%)] pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute -left-48 top-1/3 size-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--blue)_6%,transparent),transparent_70%)] pointer-events-none" 
        aria-hidden="true"
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          
          {/* Left Column: Direct info & CTA channels */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeading
                eyebrow="Get In Touch"
                title={
                  <>
                    Ready to make your business{" "}
                    <GradientText>look premium online?</GradientText>
                  </>
                }
                description="Tell us what you need — website, portfolio, posters, reels, branding, or a full digital launch. We’ll help you choose the right direction."
              />
            </Reveal>

            {/* Direct Connect Options */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 max-w-xl">
              <Reveal delay={0.1}>
                <a
                  href="https://wa.me/9779801234567?text=Hi%20Sajilo%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20a%20project!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-card group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sky/30 hover:bg-foreground/[0.04]"
                >
                  <div className="grid size-11 place-items-center rounded-xl bg-sky/10 text-sky shadow-[0_0_15px_rgba(98,176,255,0.15)] transition-transform duration-300 group-hover:scale-105">
                    <MessageSquare className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/45">Quick Chat</p>
                    <p className="text-sm font-semibold tracking-wide text-foreground group-hover:text-sky transition-colors">WhatsApp Us</p>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={0.14}>
                <a
                  href="mailto:hello@sajilostudio.com"
                  className="studio-card group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:bg-foreground/[0.04]"
                >
                  <div className="grid size-11 place-items-center rounded-xl bg-blue/10 text-blue shadow-[0_0_15px_rgba(0,126,255,0.15)] transition-transform duration-300 group-hover:scale-105">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/45">Write to Us</p>
                    <p className="text-sm font-semibold tracking-wide text-foreground group-hover:text-blue transition-colors">hello@sajilostudio.com</p>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={0.18}>
                <a
                  href="tel:+9779801234567"
                  className="studio-card group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-foreground/[0.04]"
                >
                  <div className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent shadow-[0_0_15px_rgba(214,47,73,0.15)] transition-transform duration-300 group-hover:scale-105">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/45">Call Directly</p>
                    <p className="text-sm font-semibold tracking-wide text-foreground group-hover:text-accent transition-colors">+977 9801234567</p>
                  </div>
                </a>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <Reveal delay={0.12} className="w-full">
            <div className="studio-card relative overflow-hidden rounded-[2.25rem] p-6 sm:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              {/* Card top gradient line accent */}
              <div 
                className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-sky via-blue to-accent" 
                aria-hidden="true"
              />

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.38 }}
                  >
                    <h3 className="text-2xl font-black uppercase tracking-wide text-foreground">
                      Start a Project Inquiry
                    </h3>
                    <p className="mt-2 text-xs text-foreground/50">
                      Fill out this quick form and we will review your goals.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                      
                      {/* Name field */}
                      <div className="space-y-2">
                        <label 
                          htmlFor="name" 
                          className="text-xs font-semibold uppercase tracking-wider text-foreground/75"
                        >
                          Your Name <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          aria-required="true"
                          placeholder="e.g. Sujit Shrestha"
                          className={`w-full rounded-2xl border bg-background/50 px-4 py-3 text-sm text-foreground placeholder-foreground/30 transition duration-300 focus:outline-none focus:ring-1 ${
                            errors.name 
                              ? "border-accent/50 focus:border-accent/80 focus:ring-accent/80" 
                              : "border-foreground/12 focus:border-sky/50 focus:ring-sky/50"
                          }`}
                        />
                        {errors.name && (
                          <p className="flex items-center gap-1 text-xs text-accent mt-1" role="alert">
                            <AlertCircle className="size-3.5" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Brand Name field */}
                      <div className="space-y-2">
                        <label 
                          htmlFor="brandName" 
                          className="text-xs font-semibold uppercase tracking-wider text-foreground/75"
                        >
                          Business / Brand Name
                        </label>
                        <input
                          type="text"
                          id="brandName"
                          name="brandName"
                          value={formData.brandName}
                          onChange={handleChange}
                          placeholder="e.g. Sajilo Cafe (Optional)"
                          className="w-full rounded-2xl border border-foreground/12 bg-background/50 px-4 py-3 text-sm text-foreground placeholder-foreground/30 transition duration-300 focus:border-sky/50 focus:outline-none focus:ring-1 focus:ring-sky/50"
                        />
                      </div>

                      {/* Phone/WhatsApp field */}
                      <div className="space-y-2">
                        <label 
                          htmlFor="contactNumber" 
                          className="text-xs font-semibold uppercase tracking-wider text-foreground/75"
                        >
                          Phone or WhatsApp <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          id="contactNumber"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          aria-required="true"
                          placeholder="e.g. +977 9801234567"
                          className={`w-full rounded-2xl border bg-background/50 px-4 py-3 text-sm text-foreground placeholder-foreground/30 transition duration-300 focus:outline-none focus:ring-1 ${
                            errors.contactNumber 
                              ? "border-accent/50 focus:border-accent/80 focus:ring-accent/80" 
                              : "border-foreground/12 focus:border-sky/50 focus:ring-sky/50"
                          }`}
                        />
                        {errors.contactNumber && (
                          <p className="flex items-center gap-1 text-xs text-accent mt-1" role="alert">
                            <AlertCircle className="size-3.5" />
                            {errors.contactNumber}
                          </p>
                        )}
                      </div>

                      {/* Service Needed field */}
                      <div className="space-y-2">
                        <label 
                          htmlFor="serviceNeeded" 
                          className="text-xs font-semibold uppercase tracking-wider text-foreground/75"
                        >
                          Service Needed <span className="text-accent">*</span>
                        </label>
                        <select
                          id="serviceNeeded"
                          name="serviceNeeded"
                          value={formData.serviceNeeded}
                          onChange={handleChange}
                          aria-required="true"
                          className={`w-full rounded-2xl border bg-background/50 px-4 py-3 text-sm text-foreground/80 transition duration-300 focus:outline-none focus:ring-1 appearance-none cursor-pointer ${
                            errors.serviceNeeded 
                              ? "border-accent/50 focus:border-accent/80 focus:ring-accent/80" 
                              : "border-foreground/12 focus:border-sky/50 focus:ring-sky/50"
                          }`}
                        >
                          <option value="" disabled className="bg-background text-foreground/50">Select a service...</option>
                          {servicesList.map((service) => (
                            <option key={service.value} value={service.value} className="bg-background text-foreground">
                              {service.label}
                            </option>
                          ))}
                        </select>
                        {errors.serviceNeeded && (
                          <p className="flex items-center gap-1 text-xs text-accent mt-1" role="alert">
                            <AlertCircle className="size-3.5" />
                            {errors.serviceNeeded}
                          </p>
                        )}
                      </div>

                      {/* Budget Range field */}
                      <div className="space-y-2">
                        <label 
                          htmlFor="budgetRange" 
                          className="text-xs font-semibold uppercase tracking-wider text-foreground/75"
                        >
                          Estimated Budget <span className="text-accent">*</span>
                        </label>
                        <select
                          id="budgetRange"
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleChange}
                          aria-required="true"
                          className={`w-full rounded-2xl border bg-background/50 px-4 py-3 text-sm text-foreground/80 transition duration-300 focus:outline-none focus:ring-1 appearance-none cursor-pointer ${
                            errors.budgetRange 
                              ? "border-accent/50 focus:border-accent/80 focus:ring-accent/80" 
                              : "border-foreground/12 focus:border-sky/50 focus:ring-sky/50"
                          }`}
                        >
                          <option value="" disabled className="bg-background text-foreground/50">Select a budget range...</option>
                          {budgetsList.map((budget) => (
                            <option key={budget.value} value={budget.value} className="bg-background text-foreground">
                              {budget.label}
                            </option>
                          ))}
                        </select>
                        {errors.budgetRange && (
                          <p className="flex items-center gap-1 text-xs text-accent mt-1" role="alert">
                            <AlertCircle className="size-3.5" />
                            {errors.budgetRange}
                          </p>
                        )}
                      </div>

                      {/* Message field */}
                      <div className="space-y-2">
                        <label 
                          htmlFor="message" 
                          className="text-xs font-semibold uppercase tracking-wider text-foreground/75"
                        >
                          Brief Project Details
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Tell us a little bit about what you wish to build..."
                          className="w-full rounded-2xl border border-foreground/12 bg-background/50 px-4 py-3 text-sm text-foreground placeholder-foreground/30 transition duration-300 focus:border-sky/50 focus:outline-none focus:ring-1 focus:ring-sky/50 resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full button-gradient relative overflow-hidden rounded-full py-4 text-sm font-bold text-background transition hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(0,126,255,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none mt-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="size-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Send Inquiry Proposal
                            <Send className="size-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center py-10"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_30px_rgba(52,211,153,0.15)]">
                      <CheckCircle2 className="size-8" />
                    </div>

                    <h3 className="mt-6 text-2xl font-black uppercase tracking-wide text-foreground">
                      Proposal Sent!
                    </h3>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/60">
                      Thank you, <strong className="text-foreground">{formData.name}</strong>. We have received your inquiry for a <strong className="text-foreground">{servicesList.find(s => s.value === formData.serviceNeeded)?.label}</strong>. 
                    </p>
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-foreground/45">
                      Our team will reach out to you via call or WhatsApp at <strong className="text-foreground/75">{formData.contactNumber}</strong> within 24 hours to discuss details.
                    </p>

                    <div className="mt-10 w-full space-y-3">
                      <a
                        href={`https://wa.me/9779801234567?text=Hi%20Sajilo%20Studio%2C%20I%20just%20sent%20a%20project%20inquiry%20under%20the%20name%20${encodeURIComponent(formData.name)}.%20Let's%20discuss!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 rounded-full border border-sky/20 bg-sky/5 py-3.5 text-sm font-semibold text-sky transition hover:border-sky/40 hover:bg-sky/10"
                      >
                        Message Instantly on WhatsApp
                        <ArrowRight className="size-4" />
                      </a>

                      <button
                        type="button"
                        onClick={resetForm}
                        className="text-xs text-foreground/45 hover:text-foreground/75 underline transition cursor-pointer"
                      >
                        Send another project inquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}

