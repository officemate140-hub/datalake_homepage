import { Children, cloneElement, createContext, isValidElement, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import english from './locales/en.json';

export type Locale = 'ko' | 'en';
const translations: Record<string, string> = english;

export function translate(text: string, locale: Locale): string {
  if (locale === 'ko') return text;
  const key = text.replace(/\s+/g, ' ').trim();
  const result = translations[key];
  if (result === undefined) return text;
  return (text.match(/^\s*/)?.[0] || '') + result + (text.match(/\s*$/)?.[0] || '');
}

export function localizedHref(href: string, locale: Locale): string {
  const base = import.meta.env.BASE_URL;
  // Hash-only links stay on the current page. Assets, email and external links are unchanged.
  if (!href.startsWith(base) || href.startsWith('//')) return href;
  const relative = href.slice(base.length).replace(/^en(?:\/|$)/, '');
  if (/\.[a-z0-9]+(?:[?#]|$)/i.test(relative)) return href;
  return base + (locale === 'en' ? 'en/' : '') + relative;
}

/** Translate authored presentation only. Never execute components, alter keys,
 * handlers or form values, or mutate the DOM. Each component localizes its own
 * output so stateful tabs and dialogs stay mounted when the language changes. */
function localizeContent(node: ReactNode, locale: Locale): ReactNode {
  if (typeof node === 'string') return translate(node, locale);
  if (Array.isArray(node)) return Children.map(node, child => localizeContent(child, locale));
  if (!isValidElement<Record<string, unknown>>(node)) return node;
  const props: Record<string, unknown> = {};
  if (typeof node.type === 'string') {
    for (const name of ['alt', 'title', 'placeholder', 'aria-label']) {
      if (typeof node.props[name] === 'string') props[name] = translate(node.props[name], locale);
    }
    if (node.type === 'a' && typeof node.props.href === 'string') props.href = localizedHref(node.props.href, locale);
    // Option values remain stable across languages and are not user input.
    if (node.type === 'option' && node.props.value === undefined && typeof node.props.children === 'string') props.value = node.props.children;
  }
  if ('children' in node.props) props.children = localizeContent(node.props.children as ReactNode, locale);
  return cloneElement(node, props);
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (text: string) => string;
  localize: (node: ReactNode) => ReactNode;
};
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ initialLocale = 'ko', children }: { initialLocale?: Locale; children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>(initialLocale);
  useEffect(() => {
    const onPop = () => updateLocale(window.location.pathname.slice(import.meta.env.BASE_URL.length).startsWith('en/') ? 'en' : 'ko');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    setLocale(next) {
      if (next === locale) return;
      const url = new URL(window.location.href);
      url.pathname = localizedHref(url.pathname, next);
      window.history.pushState(null, '', url);
      updateLocale(next);
    },
    t: text => translate(text, locale),
    localize: node => localizeContent(node, locale),
  }), [locale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('LanguageProvider is required');
  return value;
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  return <div className="language-switcher" role="group" aria-label={locale === 'ko' ? '언어 선택' : 'Language'}>
    <button type="button" lang="ko" aria-label="한국어" aria-pressed={locale === 'ko'} onClick={() => setLocale('ko')}>KO</button>
    <span aria-hidden="true">/</span>
    <button type="button" lang="en" aria-label="English" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
  </div>;
}
