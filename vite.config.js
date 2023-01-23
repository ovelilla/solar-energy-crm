import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const root = process.cwd();

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(root, "src"),
            "@assets": path.resolve(root, "src/assets"),
            "@config": path.resolve(root, "src/config"),
            "@context": path.resolve(root, "src/context"),
            "@features": path.resolve(root, "src/features"),
            "@hooks": path.resolve(root, "src/hooks"),
            "@icons": path.resolve(root, "src/icons"),
            "@layouts": path.resolve(root, "src/layouts"),
            "@pages": path.resolve(root, "src/pages"),
            "@routes": path.resolve(root, "src/routes"),
            "@shared": path.resolve(root, "src/shared"),
            "@styles": path.resolve(root, "src/styles"),
            "@themes": path.resolve(root, "src/themes"),
            "@variables": path.resolve(root, "src/variables"),
        },
    },
    plugins: [react()],
});
