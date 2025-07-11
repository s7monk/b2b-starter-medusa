import { QUOTE_MODULE } from "./src/modules/quote";
import { APPROVAL_MODULE } from "./src/modules/approval";
import { COMPANY_MODULE } from "./src/modules/company";
import { loadEnv, defineConfig, Modules } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV!, process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    redisUrl: process.env.REDIS_URL,
    redisOptions: {
      password: process.env.REDIS_PASSWORD
    },
    databaseDriverOptions: {
      connection: {
        ssl: false
      }
    }
  },
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://117.72.100.207:9001/",
    vite: () => {
      return {
        optimizeDeps: {
          include: ["i18next", "react-i18next", "i18next-browser-languagedetector", "i18next-http-backend"],
        },
        build: {
          rollupOptions: {
            input: {
              main: 'index.html', // Default entry
              // Add custom routes if needed to ensure inclusion
            }
          }
        }
      }
    },
    outDir: '.medusa/server/public/admin',
  },
  modules: {
    [COMPANY_MODULE]: {
      resolve: "./modules/company",
    },
    [QUOTE_MODULE]: {
      resolve: "./modules/quote",
    },
    [APPROVAL_MODULE]: {
      resolve: "./modules/approval",
    },
    [Modules.CACHE]: {
      resolve: "@medusajs/medusa/cache-inmemory",
    },
    [Modules.WORKFLOW_ENGINE]: {
      resolve: "@medusajs/medusa/workflow-engine-inmemory",
    },
    [Modules.FILE]: {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-local",
            id: "local",
            options: {
              upload_dir: "static",
              backend_url: "http://localhost:9001/static",
            },
          },
        ],
      },
    },
  },
});
