import enTranslation from './en.json';
import { SupportedLanguages } from 'enums/languages';

export const resources = {
    en: { translation: enTranslation },
};

export const LanguageNameMap = {
    [SupportedLanguages.ENGLISH]: 'English',
    // [SupportedLanguages.CHINESE]: '中国语文',
    // [SupportedLanguages.FRENCH]: 'Français',
    // [SupportedLanguages.GERMAN]: 'Deutsch',
    // [SupportedLanguages.ITALIAN]: 'Italiano',
    // [SupportedLanguages.RUSSIAN]: 'русский',
    // [SupportedLanguages.SPANISH]: 'Español',
    // [SupportedLanguages.THAI]: 'ภาษาไทย',
};

export const DEFAULT_LANGUAGE = SupportedLanguages.ENGLISH;
