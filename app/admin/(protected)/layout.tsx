import { AdminLayoutShell } from "@/_admin/AdminLayoutShell";
import { buildAdminLoginPath } from "@/_features/admin-auth/authorization";
import { adminDefaultRedirectPath } from "@/_features/admin-auth/config";
import { getStoredAdminSession } from "@/_features/admin-auth/server/session";
import { redirect } from "next/navigation";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getStoredAdminSession();

  if (!session) {
    redirect(buildAdminLoginPath(adminDefaultRedirectPath));
  }

  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
