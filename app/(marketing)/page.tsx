import { siteConfig } from "@/_config/site";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">{siteConfig.name}</h1>
      <p>{siteConfig.tagline}</p>
    </div>
  );
}
