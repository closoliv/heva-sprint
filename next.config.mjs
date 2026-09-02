/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  typescript: {
    // Keep the sprint scaffold from blocking on type nits — tighten this
    // once the real PRD is in and there's time to be strict.
    ignoreBuildErrors: false,
  },
};
export default nextConfig;
