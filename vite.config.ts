import { defineConfig } from "@solidjs/start/config";

import suidPlugin from "@suid/vite-plugin";

export default defineConfig({

  plugins: [suidPlugin()],
    start: {
        ssr: false
    },

    server: {
        port: 3000,
    },
});

