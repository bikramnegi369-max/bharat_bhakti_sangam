import { Metadata } from "next";
import { getAdminVideoReviews } from "@/_features/video-reviews/services/video-reviews.service";
import VideoReviewsManagement from "@/_features/video-reviews/components/VideoReviewsManagement";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Divine Video Reviews | Admin Console",
  description: "Manage homepage video reviews and devotee testimonial highlights.",
};

export default async function AdminVideoReviewsPage() {
  const result = await getAdminVideoReviews({ page: 1, limit: 6 });
  const items = result.data?.items || [];
  const total = result.data?.total;
  const totalPages = result.data?.totalPages;
  const page = result.data?.page ?? 1;
  const limit = result.data?.limit ?? 6;

  return (
    <VideoReviewsManagement
      initialItems={items}
      initialTotal={total}
      initialPage={page}
      initialLimit={limit}
      initialTotalPages={totalPages}
    />
  );
}
