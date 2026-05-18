"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/_components/ui/Button";
import { Field } from "@/_components/ui/Field/Field";
import {
  adminForgotPasswordSchema,
  type AdminForgotPasswordSchema,
} from "@/_schemas/adminForgotPassword.schema";
import { Loader2, ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAdminAuth } from "../hooks/useAdminAuth";

export function AdminForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { requestPasswordReset } = useAdminAuth();
  const [isRequesting, setIsRequesting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminForgotPasswordSchema>({
    resolver: zodResolver(adminForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setIsRequesting(true);
      setError(null);
      await requestPasswordReset(values.email);
      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while requesting a password reset.",
      );
    } finally {
      setIsRequesting(false);
    }
  });

  if (isSuccess) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white px-6 py-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:px-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-slate-950">
          Check your email
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-slate-600">
          We&rsquo;ve sent a password reset link to your email address. Please
          follow the instructions to reset your password.
        </p>
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to login
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
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          <Mail size={14} />
          Reset Link
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-950">Forgot password</h1>
          <p className="text-sm leading-6 text-slate-600">
            Enter your admin email and we&rsquo;ll send you a secure link to
            reset your account password.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <Field
          as="input"
          type="email"
          label="Admin email"
          placeholder="admin@example.com"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      {error && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isRequesting}
        className="mt-6 h-12 w-full! text-sm font-semibold tracking-[0.16em] uppercase"
      >
        {isRequesting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Send Reset Link"
        )}
      </Button>
    </form>
  );
}
