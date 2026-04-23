import { SidebarLogo } from "@/_components/layout/Sidebar/SidebarLogo";
import { AdminLoginForm } from "@/_features/admin-auth/components/AdminLoginForm";
import { sanitizeAdminNextPath } from "@/_features/admin-auth/authorization";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string | string[];
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const nextParam = Array.isArray(resolvedSearchParams.next)
    ? resolvedSearchParams.next[0]
    : resolvedSearchParams.next;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.18),transparent_35%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_45%,#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center gap-10 lg:flex-row lg:items-center lg:justify-between">
        <section className="max-w-xl space-y-6">
          <SidebarLogo className="justify-start" preload />

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Admin Control Center
            </p>
            <h2 className="text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              Protected operations stay behind a server-managed auth boundary.
            </h2>
            <p className="max-w-lg text-base leading-7 text-slate-600">
              This admin experience now uses signed session state, short-lived
              access tokens, refresh-token rotation support, route protection,
              and internal API proxying so admin data requests stay off browser
              storage.
            </p>
          </div>
        </section>

        <AdminLoginForm nextPath={sanitizeAdminNextPath(nextParam)} />
      </div>
    </main>
  );
}
