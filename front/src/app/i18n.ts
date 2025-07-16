import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      notification: "Notification",
      notificationLanguage: "Notification Language",
      notificationLanguageSubtitle: "Notification/SMS/Email/App Push notification language settings",
      emailSubscription: "Email Subscription",
      latestEvents: "Latest Events",
      newFuturesTokenListings: "New Futures Token Listings",
      newSpotTokenListings: "New Spot Token Listings",
      importNotifications: "Import",
      telegramNotifications: "Telegram Notifications",
    },
  },
  fa: {
    translation: {
      notification: "اعلان‌ها",
      notificationLanguage: "زبان اعلان‌ها",
      notificationLanguageSubtitle: "تنظیمات زبان اعلان‌ها/پیامک/ایمیل/نوتیفیکیشن اپلیکیشن",
      emailSubscription: "اشتراک ایمیلی",
      latestEvents: "آخرین رویدادها",
      newFuturesTokenListings: "لیستینگ توکن‌های آتی جدید",
      newSpotTokenListings: "لیستینگ توکن‌های نقدی جدید",
      importNotifications: "واردات",
      telegramNotifications: "اعلان‌های تلگرام",
    },
  },
  es: {
    translation: {
      notification: "Notificaciones",
      notificationLanguage: "Idioma de Notificaciones",
      notificationLanguageSubtitle: "Configuración del idioma de notificaciones/SMS/correo electrónico/notificaciones push de la aplicación",
      emailSubscription: "Suscripción por Correo",
      latestEvents: "Últimos Eventos",
      newFuturesTokenListings: "Nuevos Listados de Tokens de Futuros",
      newSpotTokenListings: "Nuevos Listados de Tokens Spot",
      importNotifications: "Importar",
      telegramNotifications: "Notificaciones de Telegram",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;