import { createI18n } from "vue-i18n/index";
import enMessages from "../locales/en.json";
import {
  DEFAULT_LANGUAGE,
  FALLBACK_LANGUAGE,
} from "../constants/localisationConstants.js";

const i18n = createI18n({
  locale: DEFAULT_LANGUAGE, // set locale
  fallbackLocale: FALLBACK_LANGUAGE,
  messages: { en: enMessages }, // set locale messages
});
export { i18n };
