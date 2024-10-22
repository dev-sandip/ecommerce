const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ik.imagekit.io",
        pathname: "**/*",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;