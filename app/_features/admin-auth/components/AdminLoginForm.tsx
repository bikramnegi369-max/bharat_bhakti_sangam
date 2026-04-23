"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/_components/ui/Button";
import { Field } from "@/_components/ui/Field/Field";
import { adminLoginSchema, type AdminLoginSchema } from "@/_schemas/adminLogin.schema";
import { Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAdminAuth } from "../hooks/useAdminAuth";

export function AdminLoginForm({
  nextPath,
}: {
  nextPath?: string | null;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { login, isLoggingIn } = useAdminAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setSubmitError(null);
      await login(values, nextPath);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to sign in to the admin panel.",
      );
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-3xl border border-white/10 bg-white px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:px-8"
    >
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          <ShieldCheck size={14} />
          Secure Admin Access
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-950">Welcome back</h1>
          <p className="text-sm leading-6 text-slate-600">
            Sign in to continue to the protected Bharat Bhakti Sangam admin
            workspace. Access and refresh tokens stay in secure `httpOnly`
            cookies and never touch browser storage.
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

        <Field
          as="input"
          type="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>

      {submitError && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoggingIn}
        className="mt-6 h-12 w-full! text-sm font-semibold tracking-[0.16em] uppercase"
      >
        {isLoggingIn ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing In
          </span>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
