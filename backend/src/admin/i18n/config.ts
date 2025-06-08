import { InitOptions } from "i18next"
import translations from "./translations"

export const b2bI18nOptions: InitOptions = {
  resources: translations,
  fallbackLng: "en",
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: Object.keys(translations),
} 