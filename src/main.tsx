import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './i18n';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './styles.css';
import './details.css';
import './refinements.css';
import './single-page.css';
import './readability.css';
import './contact.css';
import './language.css';

const root = document.getElementById('root')!;
const relativePath = window.location.pathname.slice(import.meta.env.BASE_URL.length);
const locale = /^en(?:\/|$)/.test(relativePath) ? 'en' : 'ko';
const path = '/' + relativePath.replace(/^en(?:\/|$)/, '');
const app = <LanguageProvider initialLocale={locale}><App path={path} /></LanguageProvider>;
// GitHub Pages serves one shared 404 file, whose language may differ from the URL.
if (root.hasChildNodes() && root.querySelector('main') && !root.querySelector('.not-found')) hydrateRoot(root, app);
else createRoot(root).render(app);
