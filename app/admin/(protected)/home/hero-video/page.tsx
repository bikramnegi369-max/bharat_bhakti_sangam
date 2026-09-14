import { Metadata } from "next";
import { getHeroVideo } from "@/_features/home-hero/services/hero-video.service";
import HeroVideoManagement from "@/_features/home-hero/components/HeroVideoManagement";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home Hero Video | Admin Console",
  description: "Upload and manage the primary hero video on the homepage.",
};

export default async function AdminHomeHeroVideoPage() {
  const result = await getHeroVideo();
  const config = result.data || {
    videoUrl: "/hero-video.mp4",
  };

  return <HeroVideoManagement initialConfig={config} />;
}
