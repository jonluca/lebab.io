/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  productionBrowserSourceMaps: true,
};

let analyze = Boolean(process.env.ANALYZE);
if (analyze) {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: analyze,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}
