import { renderToString } from 'react-dom/server';
import App from './App';
import { pageMetadata } from './pageContent';
export const pages = pageMetadata;
export function render(path = '/') { return renderToString(<App path={path} />); }
