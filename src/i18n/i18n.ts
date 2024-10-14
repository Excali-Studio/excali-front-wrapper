import * as i18n from 'i18next';
import enTranslation from '@/i18n/en.json';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: {
		translation: enTranslation,
	},
};

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: (typeof resources)['en'];
	}
}

await i18n.use(initReactI18next).init({
	lng: 'en',
	resources,
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
});

export { i18n };
