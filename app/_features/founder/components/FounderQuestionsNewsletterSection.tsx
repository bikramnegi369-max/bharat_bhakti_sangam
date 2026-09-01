"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import { subscribeToNewsletter } from "@/_features/subscription/services/subscription.service";
import ScrollReveal from "@/_components/common/ScrollReveal";

export function FounderQuestionsNewsletterSection() {
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
          "Thank you for subscribing to our devotional updates!",
        );
        setEmail("");
      } else {
        setStatus("error");
        setFeedbackMessage(
          result.error?.toLowerCase().includes("already subscribed")
            ? "You are already subscribed with this email."
            : result.error || "Subscription failed. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setFeedbackMessage("Something went wrong. Please try again later.");
    } finally {
      setTimeout(() => {
        setStatus((prev) => (prev === "success" ? "idle" : prev));
      }, 5000);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-linear-to-r from-[#D84C10] via-[#E86A17] to-[#E9901C] py-12 sm:py-16">
      {/* Decorative Mandala Overlay on Right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 w-80 sm:w-120 aspect-square opacity-20 select-none"
      >
        <Image src="/mandala.webp" alt="" fill sizes="450px" className="object-contain" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Email Newsletter Input (lg: 7.5 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal animation="fade-right" duration={750} delay={50}>
              <form
                onSubmit={handleSubmit}
                className="w-full relative"
                noValidate
              >
                <div className="relative w-full max-w-xl flex items-center p-1.5 sm:p-2 rounded-full bg-white shadow-2xl overflow-hidden">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Enter your email address..."
                    disabled={status === "loading"}
                    className={`${poppins.className} min-w-0 flex-1 bg-transparent rounded-l-full pl-5 sm:pl-7 pr-3 py-2.5 sm:py-3.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none`}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-label="Subscribe"
                    className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#740E0A] hover:bg-[#580B08] text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5 stroke-[2.2]" />
                    )}
                  </button>
                </div>

                {/* Feedback messages */}
                {status === "success" && (
                  <div className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg bg-black/40 text-green-200 text-xs sm:text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg bg-black/40 text-red-200 text-xs sm:text-sm font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}
              </form>
            </ScrollReveal>
          </div>

          {/* Right Column: Have Questions White Card (lg: 4.5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal
              animation="fade-left"
              duration={750}
              delay={150}
              className="w-full flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl text-center border border-white/50">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#740E0A] mb-3 shadow-xs">
                  <HelpCircle className="w-6 h-6 stroke-2" />
                </div>
                <h3
                  className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#3F0605]`}
                >
                  Have Questions?
                </h3>
                <p
                  className={`${poppins.className} text-xs sm:text-sm text-[#5c5c5c] font-normal mt-1 mb-5`}
                >
                  Speak directly to our team
                </p>
                <Link
                  href="/contact"
                  className={`${poppins.className} inline-block py-2.5 px-6 rounded-full bg-[#740E0A] hover:bg-[#580B08] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all duration-300 hover:scale-105 active:scale-95`}
                >
                  Get In Touch
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
