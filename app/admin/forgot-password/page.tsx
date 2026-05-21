import { AdminForgotPasswordForm } from "@/_features/admin-auth/components/AdminForgotPasswordForm";
import { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Forgot Password | Admin Access",
  description: "Request a secure password reset link for the admin panel.",
};

export default function AdminForgotPasswordPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-slate-50 p-6 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-emerald-100/40 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-blue-50/40 blur-[120px]" />

      <div className="relative z-10 flex w-full justify-center">
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4 text-slate-500">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              <p className="text-sm font-medium">
                Preparing secure environment...
              </p>
            </div>
          }
        >
          <AdminForgotPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
