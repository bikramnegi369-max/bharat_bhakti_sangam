"use client";

import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/_components/ui/Button";
import clsx from "clsx";
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
  description = "Get updates on upcoming divine events.",
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
  className,
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [specificErrorMessage, setSpecificErrorMessage] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const result = await subscribeToNewsletter(email);

      if (result.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        if (result.error?.toLowerCase().includes("email already subscribed")) {
          setSpecificErrorMessage("Email already subscribed");
        }
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <div className="space-y-1">
        <h4 className="text-lg  text-white uppercase tracking-wider">
          {title}
        </h4>
        <p className="text-sm text-white/70">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          <input
            type="email"
            required
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full grow bg-white/10 border border-white/20 rounded-md px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            aria-label="Email address"
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            className="sm:w-auto w-full! h-10 flex items-center gap-2 text-sm font-bold"
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <div className="flex items-center gap-2 text-sm">
                {buttonLabel}
                <Send className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>

        {status === "success" && (
          <p className="text-xs text-green-400 mt-2 font-medium">
            Successfully subscribed!
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400 mt-2 font-medium">
            {specificErrorMessage || "Something went wrong. Try again."}
          </p>
        )}
      </form>
    </div>
  );
}
