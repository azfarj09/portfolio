/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Lets next/font reach Google Fonts on networks that inspect HTTPS traffic
    // (school or work Wi-Fi), where the built-in certificate list isn't enough.
    turbopackUseSystemTlsCerts: true,
  },
}

export default nextConfig
