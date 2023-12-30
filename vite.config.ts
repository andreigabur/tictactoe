import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
    start: {
        ssr: false
    },

    server: {
        port: 3000,
    },
});

