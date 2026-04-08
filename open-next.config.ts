// Configuración de OpenNext para Cloudflare con R2 Cache habilitado
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
    // Se habilita R2 para permitir Incremental Static Regeneration (ISR)
    // Asegúrate de tener un bucket de R2 vinculado en tu wrangler.jsonc
    incrementalCache: r2IncrementalCache,
});