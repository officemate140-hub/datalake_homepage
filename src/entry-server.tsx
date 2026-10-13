import { renderToString } from 'react-dom/server';
import App from './App';
import { pageMetadata } from './pageContent';
import { LanguageProvider, translate, type Locale } from './i18n';
export const pages = pageMetadata;
export { translate };
export function render(path = '/', locale: Locale = 'ko') { return renderToString(<LanguageProvider initialLocale={locale}><App path={path} /></LanguageProvider>); }
