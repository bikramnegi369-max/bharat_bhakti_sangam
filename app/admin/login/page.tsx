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
      <div className="mx-auto flex flex-col min-h-[calc(100vh-4rem)] max-w-6xl justify-center gap-10  items-center ">
        <SidebarLogo />
        <AdminLoginForm nextPath={sanitizeAdminNextPath(nextParam)} />
      </div>
    </main>
  );
}
