"use client";

import { Button } from "@/_components/ui/Button";
import clsx from "clsx";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ weight: ["600", "700"], subsets: ["latin"] });

export type FormSubmitStatus = "success" | "error";

export type FormStatusConfig = {
  success: { heading: string; message: string; action: string | null };
  error: { heading: string; message: string; action: string | null };
};

type Props = {
  status: FormSubmitStatus;
  config: FormStatusConfig;
  onRetry: () => void;
  cardClassName?: string;
  errorMessage?: string | null;
  maxWidth?: string;
};

const ICONS: Record<FormSubmitStatus, React.ReactNode> = {
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  ),
};

export function FormSubmitStatusScreen({
  status,
  config,
  onRetry,
  cardClassName,
  errorMessage,
  maxWidth = "max-w-2xl",
}: Props) {
  const { heading, message, action } = config[status];
  const displayMessage = status === "error" && errorMessage ? errorMessage : message;

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "w-full mx-auto flex flex-col items-center justify-center gap-6 text-center",
        "rounded-2xl shadow-2xl border-2 border-primary",
        "px-[clamp(1.375rem,calc(1.054rem+1.607vw),2.5rem)]",
        "py-[clamp(2.5rem,calc(2rem+2.5vw),5rem)]",
        maxWidth,
        cardClassName,
      )}
    >
      {ICONS[status]}

      <h2
        className={clsx(
          cinzel.className,
          "text-[clamp(1.25rem,calc(0.75rem+2.5vw),2rem)] font-bold text-heading tracking-widest",
        )}
      >
        {heading}
      </h2>

      <p className="text-[clamp(0.875rem,calc(0.75rem+0.625vw),1.125rem)] text-para max-w-md leading-relaxed">
        {displayMessage}
      </p>

      {action !== null && (
        <div className="w-full">
          <Button
            type="button"
            variant="primary"
            onClick={onRetry}
            className="!w-full h-[clamp(2.5rem,calc(2.232rem+1.339vw),3.438rem)] mt-4"
          >
            <span className="text-sm sm:text-base font-semibold tracking-widest uppercase">
              {action}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
