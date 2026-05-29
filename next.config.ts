import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self' blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://checkout.razorpay.com https://cdn.razorpay.com; connect-src 'self' https://www.google-analytics.com https://www.facebook.com https://connect.facebook.net https://4frnn03l-8001.inc1.devtunnels.ms https://api.cloudinary.com https://*.razorpay.com https://cms.bharatbhaktisangam.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: res.cloudinary.com upload.wikimedia.org https://cms.bharatbhaktisangam.com https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com https://*.razorpay.com; font-src 'self' data:; frame-src 'self' https://www.facebook.com https://*.razorpay.com https://maps.google.com https://www.google.com;",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];

const devOrigins = ["localhost:3000", "*.devtunnels.ms", "api.razorpay.com"];

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: devOrigins,
  experimental: {
    serverActions: {
      allowedOrigins: devOrigins,
      bodySizeLimit: "50mb",
    },
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "cms.bharatbhaktisangam.com",
      },
    ],
    qualities: [25, 50, 60, 65, 75, 80, 85, 90, 95, 100],
  },
  compress: true,
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
