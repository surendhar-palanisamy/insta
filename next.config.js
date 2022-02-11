/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.google.com",
      "images.pexels.com",
      "randomuser.me",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
