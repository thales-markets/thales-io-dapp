import enTranslation from './en.json';
import { SupportedLanguages } from 'enums/languages';

export const resources = {
    en: { translation: enTranslation },
};

export const LanguageNameMap = {
    [SupportedLanguages.ENGLISH]: 'English',
};

export const DEFAULT_LANGUAGE = SupportedLanguages.ENGLISH;
