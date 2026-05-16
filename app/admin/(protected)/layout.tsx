import { AdminLayoutShell } from "@/admin/(protected)/AdminLayoutShell";
import { buildAdminLoginPath } from "@/_features/admin-auth/authorization";
import { adminDefaultRedirectPath } from "@/_features/admin-auth/config";
import { getAdminAuthStateFromCookies } from "@/_features/admin-auth/server/session";
import { redirect } from "next/navigation";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authState = await getAdminAuthStateFromCookies();

  if (
    !authState.session ||
    (!authState.accessToken && !authState.refreshToken)
  ) {
    redirect(buildAdminLoginPath(adminDefaultRedirectPath));
  }

  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
