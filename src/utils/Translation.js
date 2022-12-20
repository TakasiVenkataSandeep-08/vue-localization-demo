import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "../constants/localisationConstants";

import { i18n } from "../plugins/i18n";

const loadedLocales = ["en"];
const i18nGlobal = i18n.global;

//* set current locale in i18n
function setCurrentLocale(locale) {
  i18nGlobal.locale = locale;
}

//* get locale supported by our app
export async function getDefaultLocaleAndLoadMessages() {
  const userPreferredBrowserLocale = getBrowserPrefLocale();
  const localSavedLocale = localStorage.getItem("locale");

  if (userPreferredBrowserLocale === DEFAULT_LANGUAGE) {
    if (localSavedLocale === DEFAULT_LANGUAGE) return;
    localStorage.setItem("locale", DEFAULT_LANGUAGE);
    return;
  }

  let browserPrefLocale = "";
  if (isLocaleSupported(userPreferredBrowserLocale.locale)) {
    browserPrefLocale = userPreferredBrowserLocale.locale;
  } else if (isLocaleSupported(userPreferredBrowserLocale.localeNoISO)) {
    browserPrefLocale = userPreferredBrowserLocale.localeNoISO;
  } else {
    browserPrefLocale = DEFAULT_LANGUAGE;
  }

  //* retrieving any user saved local i.e local storage
  //* if yes lazy load local saved locale messages
  //* if no lazy load browser prefered language locale
  if (!localSavedLocale) {
    localStorage.setItem("locale", browserPrefLocale);
    await loadLocaleMessages(browserPrefLocale);
    setCurrentLocale(browserPrefLocale);
  } else {
    await loadLocaleMessages(localSavedLocale);
    setCurrentLocale(localSavedLocale);
  }
}

//* get user locale from browser language preference
function getBrowserPrefLocale() {
  let locale =
    window.navigator.language ||
    window.navigator.userLanguage ||
    DEFAULT_LANGUAGE;

  return {
    locale: locale,
    localeNoISO: locale.split("-")[0],
  };
}

//* loads locale messages based on the locale
async function loadLocaleMessages(locale) {
  if (!isLocaleSupported(locale))
    return Promise.reject(new Error("Locale not supported"));
  if (!loadedLocales.includes(locale)) {
    const msgs = await loadLocaleFile(locale);
    i18nGlobal.setLocaleMessage(locale, msgs.default || msgs);
    loadedLocales.push(locale);
  }
}

//* function to handle change in locale
export async function changeLocale(locale) {
  if (!isLocaleSupported(locale))
    return Promise.reject(new Error("Locale not supported"));
  if (i18nGlobal.locale === locale) return Promise.resolve(locale);
  localStorage.setItem("locale", locale);

  if (!loadedLocales.includes(locale)) {
    //* lazy loading locale messages
    const msgs = await loadLocaleFile(locale);
    i18nGlobal.setLocaleMessage(locale, msgs.default || msgs);

    //* saving locale in loadedLocales
    loadedLocales.push(locale);
  }

  //* setting current locale on i18n
  setCurrentLocale(locale);
}

//* load the messages file based on locale
function loadLocaleFile(locale) {
  return import(`../locales/${locale}.json`);
}

//* check if locale is supported
function isLocaleSupported(locale) {
  return SUPPORTED_LANGUAGES.includes(locale);
}
