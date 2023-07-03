import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const options: Partial<VitePWAOptions> = {
  manifest: {
    name: "Sart Views",
    description:
      "Servicio de recorridos guíados por las distintas obras de arte expuestas en la Universidad Metropolitana.",
    icons: [
      {
        src: "/vite.svg",
        sizes: "192x192",
        type: "image/svg",
      },
      {
        src: "/vite.svg",
        sizes: "512x512",
        type: "image/svg",
      },
      {
        src: "/vite.svg",
        sizes: "180x180",
        type: "image/svg",
        purpose: "apple touch icon",
      },
      {
        src: "/vite.svg",
        sizes: "225x225",
        type: "image/svg",
        purpose: "any maskable",
      },
    ],
    theme_color: "#6247aa",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
  includeAssets: "/vite.svg",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(options)],
});
