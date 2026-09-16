/**
 * Pure utility function to derive an image poster from a video URL using Cloudinary convention.
 * e.g., converts ".../video/upload/.../video.mp4" into ".../video/upload/.../video.jpg"
 */
export function derivePosterFromVideoUrl(videoUrl?: string): string {
  if (!videoUrl || typeof videoUrl !== "string") return "/gallery/gallery_1.webp";
  // If already an image extension, return as is
  if (/\.(jpg|jpeg|webp|png)$/i.test(videoUrl)) return videoUrl;
  // Cloudinary video-to-image conversion by replacing file extension with .jpg
  return videoUrl.replace(/\.[^/.]+$/, ".jpg");
}
