"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Bell,
  Calendar,
  Compass,
  Music,
  Heart,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Clock,
  Radio,
} from "lucide-react";
import { cinzel, playfair, poppins } from "@/_lib/fonts";
import { routes } from "@/_config/Routes.config";
import { subscribeToNewsletter } from "@/_features/subscription/services/subscription.service";
import ScrollReveal from "@/_components/common/ScrollReveal";

export interface EventUnavailableProps {
  title?: string;
  message?: string;
  badgeText?: string;
  highlightPoints?: Array<{
    icon: "music" | "calendar" | "heart" | "compass";
    title: string;
    description: string;
  }>;
}

const defaultHighlights = [
  {
    icon: "music" as const,
    title: "High-Energy Kirtan & Bhajans",
    description:
      "Experience divine mantras blended with live instruments and modern devotional music.",
  },
  {
    icon: "calendar" as const,
    title: "New Dates & City Announcements",
    description:
      "We host gatherings in major cities across India. Get notified first when we come to your city.",
  },
  {
    icon: "heart" as const,
    title: "Vibrant Youth & Family Community",
    description:
      "A joyful, alcohol-free and pure spiritual celebration open to devotees of all age groups.",
  },
];

export function EventUnavailable({
  title = "Our Next Bhajan Clubbing Event is Coming Soon!",
  message = "We are finalizing the date, city, and venue for our upcoming gathering. Enter your email below to get first access to tickets and early announcements.",
  badgeText = "Announcing Soon",
  highlightPoints = defaultHighlights,
}: EventUnavailableProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubscribe = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await subscribeToNewsletter(trimmed);
      if (res.success) {
        setStatus("success");
        setStatusMessage(
          "Hare Krishna! You're on the VIP priority invite list.",
        );
        setEmail("");
      } else {
        setStatus("error");
        if (res.error?.toLowerCase().includes("already")) {
          setStatusMessage(
            "You're already registered for exclusive gathering alerts!",
          );
        } else {
          setStatusMessage(
            res.error || "Unable to join the list right now. Please try again.",
          );
        }
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Something went wrong. Please try again in a few moments.",
      );
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "music":
        return <Music className="w-5 h-5 text-[#E86A17]" />;
      case "calendar":
        return <Calendar className="w-5 h-5 text-[#D4AF37]" />;
      case "heart":
        return <Heart className="w-5 h-5 text-[#740E0A]" />;
      default:
        return <Compass className="w-5 h-5 text-[#E86A17]" />;
    }
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-[#FCFAF5] via-[#FFFDF9] to-[#FCFAF5]">
      {/* Sacred Ambient Background Glows */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-150 h-87.5 sm:w-212.5 sm:h-112.5 bg-linear-to-br from-[#FED7AA]/35 via-[#FCE7D0]/20 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-100 h-75 bg-linear-to-t from-[#F0E6D8]/40 to-transparent blur-2xl -z-10"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Main Coming Soon Card */}
        <ScrollReveal animation="fade-up" duration={800} className="w-full">
          <div className="relative rounded-3xl sm:rounded-4xl border border-[#F0E6D8] bg-white/95 backdrop-blur-md p-6 sm:p-12 lg:p-14 shadow-[0_20px_60px_-15px_rgba(116,14,10,0.08)] overflow-hidden">
            {/* Top Decorative Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#FED7AA] via-[#E86A17] to-[#740E0A]" />

            {/* Glowing Aura Orb */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#FFF7ED] border border-[#FED7AA]/40 blur-xl opacity-70" />

            <div className="relative text-center max-w-3xl mx-auto">
              {/* Badge: Live pulse indicator */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[#740E0A] mb-6 shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E86A17] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E86A17]" />
                </span>
                <span
                  className={`${poppins.className} text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#E86A17]`}
                >
                  {badgeText}
                </span>
                <Radio className="w-3.5 h-3.5 text-[#740E0A] opacity-70 hidden sm:inline-block" />
              </div>

              {/* Grand Main Heading */}
              <h1
                className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3F0605] tracking-tight leading-[1.2] mb-4`}
              >
                {title}
              </h1>

              {/* Informative description */}
              <p
                className={`${poppins.className} text-sm sm:text-base md:text-lg text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10`}
              >
                {message}
              </p>

              {/* VIP Priority Notification Form */}
              <div className="w-full max-w-xl mx-auto mb-10">
                <div className="rounded-2xl bg-[#FCFAF5] border border-[#F0E6D8] p-4 sm:p-5 shadow-inner">
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#740E0A] mb-3">
                    <Sparkles className="w-4 h-4 text-[#E86A17]" />
                    <span>Be the First to Know When Passes & Dates Drop</span>
                  </div>

                  {status === "success" ? (
                    <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium animate-in fade-in zoom-in duration-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>{statusMessage}</span>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubscribe}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
                    >
                      <div className="relative flex-1">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email for VIP invite..."
                          disabled={status === "loading"}
                          className={`${poppins.className} w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#740E0A]/20 focus:border-[#740E0A] transition-all disabled:opacity-60`}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className={`${poppins.className} inline-flex items-center justify-center gap-2 rounded-xl bg-[#740E0A] hover:bg-[#8B140F] active:scale-[0.98] px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-all shadow-[0_4px_14px_rgba(116,14,10,0.25)] hover:shadow-[0_6px_20px_rgba(116,14,10,0.35)] disabled:opacity-60 cursor-pointer`}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Joining...</span>
                          </>
                        ) : (
                          <>
                            <Bell className="w-4 h-4" />
                            <span>Notify Me</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {status === "error" && statusMessage && (
                    <div className="flex items-center gap-2 mt-3 text-xs text-rose-700 justify-center">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  <p className="text-[11px] sm:text-xs text-stone-500 mt-3 text-center">
                    No spam ever. Only pure devotional updates, city
                    announcements & early booking access.
                  </p>
                </div>
              </div>

              {/* Highlights Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2 pb-6 border-t border-[#F0E6D8]/80">
                {highlightPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="group rounded-2xl border border-stone-100 bg-[#FCFAF5]/70 hover:bg-[#FFF7ED]/50 transition-colors p-4 sm:p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#F0E6D8] flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
                      {renderIcon(item.icon)}
                    </div>
                    <h2
                      className={`${cinzel.className} text-sm sm:text-base font-bold text-[#3F0605] mb-1.5`}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={`${poppins.className} text-xs text-stone-600 leading-relaxed`}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Navigation Action Anchors */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
                <Link
                  href={routes.home}
                  className={`${poppins.className} w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#740E0A] hover:bg-[#8B140F] px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-colors shadow-xs`}
                >
                  <span>Explore Bharat Bhakti Home</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={routes.famousTemples}
                  className={`${poppins.className} w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white hover:bg-[#FFF7ED] hover:border-[#FED7AA] px-6 py-3 text-xs sm:text-sm font-medium text-stone-700 transition-colors shadow-xs`}
                >
                  <Compass className="w-4 h-4 text-[#E86A17]" />
                  <span>Discover Famous Temples</span>
                </Link>

                <Link
                  href={routes.festivals}
                  className={`${poppins.className} w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white hover:bg-[#FFF7ED] hover:border-[#FED7AA] px-6 py-3 text-xs sm:text-sm font-medium text-stone-700 transition-colors shadow-xs`}
                >
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Spiritual Calendar</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
