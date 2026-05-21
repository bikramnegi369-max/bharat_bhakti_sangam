"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/_components/ui/Button";
import { Field } from "@/_components/ui/Field/Field";
import {
  adminResetPasswordSchema,
  type AdminResetPasswordSchema,
} from "@/_schemas/adminResetPassword.schema";
import { Loader2, CheckCircle2, Lock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAdminAuth } from "../hooks/useAdminAuth";

export function AdminResetPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { resetPassword } = useAdminAuth();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Derived error: prioritizing token validation, then submission errors, then schema errors
  const error = !token
    ? "A valid security token is required to reset your password. Please check your email for the correct link or request a new one."
    : submitError ||
      errors.password?.message ||
      errors.confirmPassword?.message ||
      errors.root?.message;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminResetPasswordSchema>({
    resolver: zodResolver(adminResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!token) return;

    try {
      setSubmitError(null);
      await resetPassword(token, values.password);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to update your password.",
      );
    }
  });

  if (isSuccess) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white px-6 py-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:px-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-slate-950">
          Password updated
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-slate-600">
          Your password has been successfully reset. You can now sign in with
          your new credentials.
        </p>
        <Link
          href="/admin/login"
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Sign in to Admin
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-3xl border border-white/10 bg-white px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:px-8"
    >
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          <Lock size={14} />
          Secure Reset
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-950">
            Set new password
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            Please enter and confirm your new administrator password.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <Field
          as="input"
          type="password"
          label="New Password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Field
          as="input"
          type="password"
          label="Confirm New Password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      {error && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || !token}
        className="mt-6 h-12 w-full! text-sm font-semibold tracking-[0.16em] uppercase"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
