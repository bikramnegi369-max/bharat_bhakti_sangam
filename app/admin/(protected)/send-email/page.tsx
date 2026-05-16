import { createPageMetadata } from "@/_lib/seo";
import { SendEmailWorkspace } from "@/_features/admin-email/components/SendEmailWorkspace";
import { getSuggestedEmailRecipients } from "@/_features/admin-email/services/admin-email.service";

export const metadata = createPageMetadata({
  title: "Send Email",
  description:
    "Compose and send client emails with secure attachment handling from the admin workspace.",
  path: "/admin/send-email",
  noIndex: true,
});

export default async function AdminSendEmailPage() {
  const recipientOptionsResult = await getSuggestedEmailRecipients();
  const recipientOptions =
    recipientOptionsResult.success && recipientOptionsResult.data
      ? recipientOptionsResult.data.items
      : [];

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-4xl bg-[radial-gradient(circle_at_top_left,rgba(252,173,51,0.35),transparent_30%),linear-gradient(135deg,#0f172a_0%,#111827_48%,#1f2937_100%)] px-6 py-7 text-white shadow-xl lg:px-8 lg:py-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Admin Outreach
          </p>
          <h1 className="text-3xl font-bold lg:text-4xl">Send Email</h1>
          <p className="max-w-2xl text-sm text-slate-200 lg:text-base">
            Reach clients with polished updates, event documents, and visual
            attachments from one focused workflow. Attachments are previewed in
            the browser and transmitted only when you submit.
          </p>
        </div>
      </div>

      <SendEmailWorkspace
        initialRecipientOptions={recipientOptions}
        suggestionsError={
          recipientOptionsResult.success ? null : recipientOptionsResult.error
        }
      />
    </section>
  );
}
