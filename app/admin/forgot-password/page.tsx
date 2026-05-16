import { AdminResetPasswordForm } from "@/_features/admin-auth/components/AdminResetPasswordForm";
import { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Reset Password | Admin Access",
  description: "Set a new secure password for your administrator account.",
};

export default function AdminResetPasswordPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-slate-50 p-6 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] h-100 w-100 rounded-full bg-emerald-100/40 blur-[120px]" />
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
          <AdminResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
