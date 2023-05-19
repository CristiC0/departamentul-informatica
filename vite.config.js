import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
const createPath = (url) => path.resolve(__dirname, url);

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": createPath("./src"),
            "@languages": createPath("./src/assets/translations"),
            "@hooks": createPath("./src/hooks"),
            "@components": createPath("./src/components"),
            "@context": createPath("./src/context"),
            "@pages": createPath("./src/pages"),
            "@schemas": createPath("./src/schemas"),
            "@images": createPath("./src/assets/images"),
            "@layouts": createPath("./src/layouts"),
            "@routes": createPath("./src/routes"),
        },
    },
    plugins: [react()],
    server: {
        port: "4200",
        https: false,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "./src/styles/_main.scss" as *;`,
            },
        },
    },
});
