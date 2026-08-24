"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import { subscribeToNewsletter } from "../services/subscription.service";

interface SubscribeFormProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
}

export function SubscribeForm({
  title = "Join the Club",
  description = "Get devotional event updates & exclusive invites.",
  placeholder = "Enter your email address...",
  buttonLabel = "Subscribe",
  className,
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await subscribeToNewsletter(trimmedEmail);

      if (result.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        if (result.error?.toLowerCase().includes("already subscribed")) {
          setErrorMessage("You're already on our divine journey list!");
        } else {
          setErrorMessage(result.error || "Subscription failed. Please try again.");
        }
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setTimeout(() => {
        setStatus((prev) => (prev === "success" ? "idle" : prev));
      }, 5000);
    }
  };

  return (
    <div className={clsx("flex flex-col gap-3.5 w-full", className)}>
      {/* Header Info */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold shrink-0 animate-pulse" />
          <h4
            className={clsx(
              playfair.className,
              "text-lg sm:text-xl font-bold tracking-wide text-white",
            )}
          >
            {title}
          </h4>
        </div>
        <p
          className={clsx(
            poppins.className,
            "text-xs sm:text-[13px] text-white/75 leading-relaxed font-normal",
          )}
        >
          {description}
        </p>
      </div>

      {/* Subscription Form Input */}
      <form onSubmit={handleSubmit} className="w-full relative group">
        <div
          className={clsx(
            "relative flex items-center p-1 sm:p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner transition-all duration-300",
            "focus-within:border-gold/80 focus-within:ring-2 focus-within:ring-gold/30 focus-within:bg-white/15",
          )}
        >
          <label htmlFor="footer-subscribe-email" className="sr-only">
            {placeholder}
          </label>
          <input
            id="footer-subscribe-email"
            type="email"
            required
            placeholder={placeholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            disabled={status === "loading"}
            className={clsx(
              poppins.className,
              "min-w-0 flex-1 bg-transparent pl-4 pr-2 py-2 text-xs sm:text-sm text-white placeholder:text-white/45 placeholder:font-normal font-normal border-none",
              "focus:outline-none focus:ring-0 disabled:opacity-60",
            )}
            aria-label="Email address for subscription"
          />

          {/* Action Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className={clsx(
              "shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm tracking-wide text-white cursor-pointer",
              "bg-linear-to-r from-primary via-[#8C1610] to-[#E86A17] hover:brightness-110",
              "border border-white/20 shadow-md transition-all duration-300 hover:scale-105 active:scale-95",
              "flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed",
            )}
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{buttonLabel}</span>
                <Send className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </div>

        {/* Feedback Messages */}
        {status === "success" && (
          <div
            role="status"
            className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-green-950/60 border border-green-500/30 text-green-300 text-xs font-medium animate-fadeIn"
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-green-400" />
            <span>Thank you for subscribing to Bharat Bhakti Sangam!</span>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 text-xs font-medium animate-fadeIn"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
}

