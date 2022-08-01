import { defineConfig } from "vite";
import inject from "@rollup/plugin-inject";

import stdLibBrowser from "node-stdlib-browser";
import topLevelAwait from "vite-plugin-top-level-await";
// https://vitejs.dev/config/
const alias = { ...stdLibBrowser };
export default defineConfig({
  plugins: [
    {
      ...inject({
        global: [require.resolve("node-stdlib-browser/helpers/esbuild/shim"), "global"],
        process: [require.resolve("node-stdlib-browser/helpers/esbuild/shim"), "process"],
        Buffer: [require.resolve("node-stdlib-browser/helpers/esbuild/shim"), "Buffer"],
      }),
      enforce: "post",
    },
    topLevelAwait(),
  ],
  build: {
    minify: true,
    sourcemap: true,
    commonjsOptions: {
      sourceMap: true,
    },
  },
  resolve: { alias },
  root: "src",
  define: { "process.env": process.env },
  server: {
    host: "0.0.0.0",
    port: 3000,
    fs: {
      strict: false,
    },
  },
  esbuild: {
    keepNames: true,
  },
  css: { devSourcemap: true },
});
