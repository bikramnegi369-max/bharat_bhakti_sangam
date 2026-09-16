"use client";

import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  SPONSORSHIP_OPPORTUNITIES,
  SPONSOR_BUDGET_RANGES,
} from "../constants/sponsors.constants";
import {
  SponsorEnquiryFormData,
  sponsorEnquirySchema,
} from "../schemas/sponsorEnquiry.schema";
import { submitSponsorEnquiry } from "../services/sponsorsEnquiry.service";
import { sendGAEvent } from "@next/third-parties/google";
import { trackMetaPixel } from "@/_lib/meta-pixel";

interface SponsorEnquirySectionProps {
  selectedOpportunityTitle?: string;
  onOpportunityTitleChange?: (title: string) => void;
}

export function SponsorEnquirySection({
  selectedOpportunityTitle,
  onOpportunityTitleChange,
}: SponsorEnquirySectionProps) {
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SponsorEnquiryFormData>({
    resolver: zodResolver(sponsorEnquirySchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      companyName: "",
      designation: "",
      email: "",
      phone: "",
      websiteOrInstagram: "",
      sponsorshipInterest: selectedOpportunityTitle || "",
      estimatedBudgetRange: "",
      productServiceContribution: "",
      additionalMessage: "",
    },
  });

  // Keep sponsorshipInterest input in sync if user selects card elsewhere on page
  useEffect(() => {
    if (selectedOpportunityTitle) {
      setValue("sponsorshipInterest", selectedOpportunityTitle, {
        shouldValidate: true,
      });
    }
  }, [selectedOpportunityTitle, setValue]);

  const onSubmit = (data: SponsorEnquiryFormData) => {
    setStatusMessage(null);
    startTransition(async () => {
      const res = await submitSponsorEnquiry(data);
      if (res.success) {
        setStatusMessage({
          type: "success",
          message:
            res.data?.message ||
            "Thank you for reaching out! Our sponsorship team will contact you shortly.",
        });
        reset();

        // Analytics tracking
        sendGAEvent("event", "sponsor_enquiry_submitted", {
          form_name: "sponsorship_enquiry_form",
          sponsorship_interest: data.sponsorshipInterest,
          company: data.companyName,
        });
        trackMetaPixel("Lead", {
          content_name: "Sponsorship Enquiry",
          content_category: "sponsorship",
        });
      } else {
        setStatusMessage({
          type: "error",
          message:
            res.error || "Failed to submit your enquiry. Please try again.",
        });
      }
    });
  };

  return (
    <section
      id="sponsorship-form"
      className="relative w-full bg-[#FDF8F0] py-16 sm:py-20 lg:py-24 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Column: The Form (7 cols on desktop) */}
          <div className="lg:col-span-7 bg-[#FEF9F2] rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E5DFD3] shadow-sm">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3F0605] tracking-tight">
                SPONSORSHIP ENQUIRY FORM
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                Fill in the details below and our team will get in touch with
                you.
              </p>
            </div>

            {/* Status Alert Banner */}
            {statusMessage && (
              <div
                className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm ${
                  statusMessage.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold">
                    {statusMessage.type === "success" ? "Success" : "Error"}
                  </p>
                  <p>{statusMessage.message}</p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {/* Row 1: Full Name, Company / Brand Name, Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    {...register("fullName")}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#740E0A] transition-all ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#E5DFD3] focus:border-[#740E0A]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500 font-medium">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Company / Brand Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800">
                    Company / Brand Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your company or brand"
                    {...register("companyName")}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#740E0A] transition-all ${
                      errors.companyName
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#E5DFD3] focus:border-[#740E0A]"
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-[11px] text-red-500 font-medium">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                {/* Designation */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800">
                    Designation
                  </label>
                  <input
                    type="text"
                    placeholder="Your designation"
                    {...register("designation")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DFD3] text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#740E0A] focus:border-[#740E0A] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email Address, Phone / WhatsApp, Website / Instagram */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    {...register("email")}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#740E0A] transition-all ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#E5DFD3] focus:border-[#740E0A]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800">
                    Phone / WhatsApp <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...register("phone")}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#740E0A] transition-all ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#E5DFD3] focus:border-[#740E0A]"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 font-medium">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Website / Instagram */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800">
                    Website / Instagram
                  </label>
                  <input
                    type="text"
                    placeholder="https:// or @yourbrand"
                    {...register("websiteOrInstagram")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DFD3] text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#740E0A] focus:border-[#740E0A] transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Sponsorship Interest (Dropdown) & Estimated Budget Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sponsorship Interest */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800">
                    Sponsorship Interest <span className="text-red-600">*</span>
                  </label>
                  <select
                    {...register("sponsorshipInterest", {
                      onChange: (e) =>
                        onOpportunityTitleChange?.(e.target.value),
                    })}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#740E0A] transition-all ${
                      errors.sponsorshipInterest
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#E5DFD3] focus:border-[#740E0A]"
                    }`}
                  >
                    <option value="">Select an option</option>
                    {SPONSORSHIP_OPPORTUNITIES.map((opp) => (
                      <option key={opp.id} value={opp.title}>
                        {opp.title}
                      </option>
                    ))}
                    <option value="Custom Partnership">
                      Custom Partnership
                    </option>
                  </select>
                  {errors.sponsorshipInterest && (
                    <p className="text-[11px] text-red-500 font-medium">
                      {errors.sponsorshipInterest.message}
                    </p>
                  )}
                </div>

                {/* Estimated Budget Range */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800">
                    Estimated Budget Range
                  </label>
                  <select
                    {...register("estimatedBudgetRange")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DFD3] text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#740E0A] focus:border-[#740E0A] transition-all"
                  >
                    {SPONSOR_BUDGET_RANGES.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Product / Service Contribution & Additional Message */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800">
                    Product / Service Contribution
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how you would like to contribute"
                    {...register("productServiceContribution")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DFD3] text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#740E0A] focus:border-[#740E0A] transition-all resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Your message..."
                    {...register("additionalMessage")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DFD3] text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#740E0A] focus:border-[#740E0A] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Action and Privacy reassurance */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto shrink-0 px-6 sm:px-7 py-3 rounded-lg bg-linear-to-r from-[#5A0A06] to-[#6B0C0D] hover:from-[#740E0A] hover:to-[#851213] disabled:opacity-60 text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      <span className="whitespace-nowrap">SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span className="whitespace-nowrap">SUBMIT PARTNERSHIP ENQUIRY</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <Lock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>
                    Your information is safe with us. We respect your privacy.
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Devotional Vision & Commitment Card (5 cols on desktop) with full background image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#E5DFD3] shadow-md p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-145 lg:min-h-full group">
            {/* Full-bleed card background image */}
            <div className="absolute inset-0 z-0 select-none">
              <Image
                src="/home_hero.webp"
                alt="Bharat Bhakti Sangam Devotion"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center brightness-100 contrast-105"
              />
              {/* Background is solid #FBF3E6 across the content, then transitions to transparent towards the right */}
              <div className="absolute inset-0 bg-linear-to-r from-[#FBF3E6] from-45% via-[#FBF3E6]/90 via-60% to-transparent" />

              {/* Decorative Golden Mandala at Top-Left */}
              <div className="absolute -top-24 sm:-top-32 -left-24 sm:-left-32 w-64 sm:w-80 h-64 sm:h-80 pointer-events-none select-none opacity-20 sm:opacity-25 z-0">
                <Image
                  src="/mandala.webp"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 320px, 400px"
                  className="object-contain"
                  aria-hidden="true"
                />
              </div>

              {/* Decorative Golden Mandala at Bottom-Left */}
              <div className="absolute -bottom-24 sm:-bottom-32 -left-24 sm:-left-32 w-64 sm:w-80 h-64 sm:h-80 pointer-events-none select-none opacity-20 sm:opacity-25 z-0">
                <Image
                  src="/mandala.webp"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 320px, 400px"
                  className="object-contain"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Top Content: Lotus, Heading, Body & Sign-off */}
            <div className="relative z-10 space-y-5">
              <div className="w-10 h-10 rounded-full bg-amber-100/90 backdrop-blur-md border border-amber-300 flex items-center justify-center text-[#E86A17] shadow-xs">
                <span className="text-xl">🪷</span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#3F0605] tracking-tight leading-snug">
                  LET&apos;S CREATE SOMETHING MEANINGFUL TOGETHER
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed max-w-md">
                  Bring your brand into an experience built around devotion,
                  culture, music and community. Partner with us and be a part of
                  a movement that inspires thousands and strengthens the spirit
                  of Bharat.
                </p>
              </div>

              {/* Team Sign-off */}
              <div className="pt-3 border-t border-[#3F0605]/15 space-y-1">
                <div className="font-serif italic text-2xl text-[#3F0605] font-bold tracking-tight">
                  Bhakti Sangam
                </div>
                <div className="text-xs text-neutral-600 font-semibold">
                  Team Bharat Bhakti Sangam
                </div>
              </div>
            </div>

            {/* Bottom Slogan Motif Over Live Backdrop with high z-index */}
            <div className="relative z-20 pt-16 sm:pt-20 flex justify-end">
              <div className="text-right px-4 py-2 rounded-xl bg-black/45 backdrop-blur-md border border-white/20 shadow-lg">
                <div className="text-xs uppercase tracking-widest font-semibold text-amber-300 drop-shadow-sm">
                  Different People,
                </div>
                <div className="text-base sm:text-lg font-bold text-white tracking-wide drop-shadow-sm">
                  One Purpose.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
