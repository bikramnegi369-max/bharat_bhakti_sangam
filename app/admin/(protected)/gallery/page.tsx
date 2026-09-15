import { Metadata } from "next";
import { getAdminGalleryItems } from "@/_features/gallery/services/gallery.service";
import GalleryManagement from "@/_features/gallery/components/GalleryManagement";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery Management | Admin Console",
  description: "Manage homepage and event page gallery photos and artist details.",
};

export default async function AdminGalleryPage() {
  const result = await getAdminGalleryItems({ page: 1, limit: 6 });
  const items = result.data?.items || [];
  const total = result.data?.total;
  const totalPages = result.data?.totalPages;
  const page = result.data?.page ?? 1;
  const limit = result.data?.limit ?? 6;

  return (
    <GalleryManagement
      initialItems={items}
      initialTotal={total}
      initialPage={page}
      initialLimit={limit}
      initialTotalPages={totalPages}
    />
  );
}
