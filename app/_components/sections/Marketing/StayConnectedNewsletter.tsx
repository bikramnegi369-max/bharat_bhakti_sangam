"use client";

import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  Mail,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import { subscribeToNewsletter } from "@/_features/subscription/services/subscription.service";

import ScrollReveal from "@/_components/common/ScrollReveal";

export interface StayConnectedNewsletterProps {
  icon?: React.ElementType;
  subtitle?: string;
  title?: string;
  placeholder?: string;
  className?: string;
}

export default function StayConnectedNewsletter({
  icon: Icon = Mail,
  subtitle = "Subscribe to our newsletter and never miss an update on our events, stories and spiritual insights.",
  title = "Stay Connected with Bharat Bhakti Sangam",
  placeholder = "Enter your email address",
  className,
}: StayConnectedNewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) return;

    setStatus("loading");
    setFeedbackMessage("");

    try {
      const result = await subscribeToNewsletter(trimmedEmail);

      if (result.success) {
        setStatus("success");
        setFeedbackMessage(
          "Thank you for subscribing! Stay tuned for divine updates.",
        );
        setEmail("");
      } else {
        setStatus("error");
        if (result.error?.toLowerCase().includes("already subscribed")) {
          setFeedbackMessage("You are already subscribed with this email.");
        } else {
          setFeedbackMessage(
            result.error ||
              "Subscription failed. Please check your email and try again.",
          );
        }
      }
    } catch {
      setStatus("error");
      setFeedbackMessage("Something went wrong. Please try again later.");
    } finally {
      // Clear status after delay if success
      setTimeout(() => {
        setStatus((prev) => (prev === "success" ? "idle" : prev));
      }, 5000);
    }
  };

  return (
    <section
      aria-labelledby="newsletter-headline"
      className={clsx(
        "relative w-full overflow-hidden",
        "py-[clamp(2.75rem,calc(1.8rem+3vw),4.5rem)]",
        className,
      )}
    >
      <div className="relative max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Banner Card Container with rich gradient & delicate border */}
        <div
          className={clsx(
            "relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl",
            "border border-white/20",
            // Rich smooth gradient matching the design: deep crimson/rust red on left to warm saffron/amber gold on right
            "bg-linear-to-r from-[#9B1D0E] via-[#D84C10] to-[#E9901C]",
            "p-[clamp(1.75rem,calc(1.25rem+2vw),3.25rem)]",
          )}
        >
          {/* Decorative Mandala Overlay on the right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 sm:-right-20 md:-right-12 lg:-right-10 top-1/2 -translate-y-1/2 w-85 sm:w-115 md:w-140 lg:w-155 aspect-square opacity-25 select-none animate-float"
          >
            <Image
              src="/mandala.webp"
              alt=""
              fill
              sizes="(max-width: 640px) 340px, (max-width: 1024px) 560px, 620px"
              className="object-contain object-center"
              priority={false}
            />
          </div>

          {/* Ambient Lighting Accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-[#FFE29A]/15 blur-3xl animate-glow"
          />

          {/* Inner Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* Left Column: Icon + Subtitle + Heading (7 cols at lg) */}
            <ScrollReveal
              animation="fade-right"
              duration={850}
              threshold={0.15}
              className="lg:col-span-7 flex flex-col items-start text-left"
            >
              {/* Glassmorphic Icon Badge */}
              <div
                className={clsx(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-5",
                  "bg-white/15 backdrop-blur-md border border-white/25 shadow-inner text-white",
                  "transition-transform duration-300 hover:scale-105",
                )}
                aria-hidden="true"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
              </div>

              {/* Subtitle */}
              <p
                className={clsx(
                  poppins.className,
                  "text-white/90 text-[clamp(0.85rem,calc(0.8rem+0.2vw),0.975rem)] leading-relaxed font-normal max-w-xl mb-2 sm:mb-3",
                )}
              >
                {subtitle}
              </p>

              {/* Heading */}
              <h2
                id="newsletter-headline"
                className={clsx(
                  playfair.className,
                  "text-white font-bold tracking-tight",
                  "text-[clamp(1.75rem,calc(1.35rem+1.6vw),2.75rem)] leading-[1.15]",
                )}
              >
                {title}
              </h2>
            </ScrollReveal>

            {/* Right Column: Pill Form Input + Button (5 cols at lg) */}
            <ScrollReveal
              animation="fade-left"
              delay={120}
              duration={850}
              threshold={0.15}
              className="lg:col-span-5 w-full flex flex-col justify-center"
            >
              <form
                onSubmit={handleSubmit}
                className="w-full relative group"
                noValidate
              >
                {/* Clean White Pill Container */}
                <div
                  className={clsx(
                    "relative w-full flex items-center p-1.5 sm:p-2 rounded-full bg-white shadow-xl overflow-hidden transition-all duration-300",
                    "focus-within:ring-4 focus-within:ring-white/30 focus-within:shadow-2xl",
                  )}
                >
                  <label htmlFor="newsletter-email-input" className="sr-only">
                    {placeholder}
                  </label>

                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder={placeholder}
                    disabled={status === "loading"}
                    className={clsx(
                      poppins.className,
                      "min-w-0 flex-1 bg-transparent rounded-l-full pl-4 sm:pl-6 pr-3 py-2.5 sm:py-3 text-[14px] sm:text-[15px]",
                      "text-gray-900 placeholder:text-gray-400 placeholder:font-normal font-normal border-none",
                      "focus:outline-none focus:ring-0 disabled:opacity-60",
                    )}
                    aria-label="Email address for newsletter"
                  />

                  {/* Circular Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-label="Subscribe to newsletter"
                    className={clsx(
                      "shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer",
                      "bg-[#8B150A] hover:bg-[#6E0F07] text-white shadow-md",
                      "transition-all duration-300 hover:scale-105 active:scale-95",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B150A]",
                      "disabled:opacity-75 disabled:cursor-not-allowed",
                    )}
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5 stroke-[2.25] transition-transform duration-300 group-hover:translate-x-0.5" />
                    )}
                  </button>
                </div>

                {/* Status / Feedback Notifications */}
                {status === "success" && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur-sm text-green-300 text-xs sm:text-sm font-medium animate-fadeIn"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {status === "error" && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur-sm text-red-200 text-xs sm:text-sm font-medium animate-fadeIn"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

