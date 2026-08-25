import { playfair, poppins } from "@/_lib/fonts";
import clsx from "clsx";
import { CheckCircle2, AlertCircle, RefreshCw, PlusCircle } from "lucide-react";

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

export function FormSubmitStatusScreen({
  status,
  config,
  onRetry,
  cardClassName,
  errorMessage,
  maxWidth = "max-w-2xl",
}: Props) {
  const { heading, message, action } = config[status];
  const displayMessage =
    status === "error" && errorMessage ? errorMessage : message;

  const isSuccess = status === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "w-full mx-auto flex flex-col items-center justify-center text-center",
        "rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12",
        "bg-white border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.05)]",
        maxWidth,
        cardClassName,
      )}
    >
      {/* Status Icon Badge */}
      <div
        className={clsx(
          "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-6 shadow-xs",
          isSuccess
            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
            : "bg-red-50 text-[#8A110D] border border-red-200",
        )}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 stroke-2" />
        ) : (
          <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 stroke-2" />
        )}
      </div>

      {/* Heading */}
      <h2
        className={clsx(
          playfair.className,
          "text-2xl sm:text-3xl lg:text-[2rem] font-bold tracking-tight text-heading",
        )}
      >
        {heading}
      </h2>

      {/* Decorative Gold Accent */}
      <div
        aria-hidden="true"
        className={clsx(
          "w-12 h-0.5 mx-auto mt-3 mb-4 rounded-full",
          isSuccess ? "bg-[#D4AF37]" : "bg-red-400/60",
        )}
      />

      {/* Message */}
      <p
        className={clsx(
          poppins.className,
          "text-xs sm:text-sm text-stone-600 max-w-md leading-relaxed font-normal",
        )}
      >
        {displayMessage}
      </p>

      {/* Action Button */}
      {action !== null && (
        <div className="w-full max-w-xs mt-8">
          <button
            type="button"
            onClick={onRetry}
            className={clsx(
              poppins.className,
              "w-full h-11 sm:h-12 px-6 rounded-xl sm:rounded-2xl text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] cursor-pointer",
              isSuccess
                ? "bg-[#8A110D] hover:bg-[#720E0B]"
                : "bg-[#740E0A] hover:bg-[#8B140F]",
            )}
          >
            {isSuccess ? (
              <>
                <PlusCircle size={16} strokeWidth={2.2} />
                <span>{action}</span>
              </>
            ) : (
              <>
                <RefreshCw size={16} strokeWidth={2.2} />
                <span>{action}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
