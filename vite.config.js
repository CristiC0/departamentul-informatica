import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@languages": path.resolve(__dirname, "./src/assets/translations"),
            "@images": path.resolve(__dirname, "./src/assets/images"),
            "@components": path.resolve(__dirname, "./src/components"),
        },
    },
    plugins: [react()],
    server: {
        port: "4200",
    },
});
