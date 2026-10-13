import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './styles.css';
import './details.css';
import './refinements.css';
import './single-page.css';
import './readability.css';

const root = document.getElementById('root')!;
const path = '/' + window.location.pathname.slice(import.meta.env.BASE_URL.length);
if (root.hasChildNodes() && root.querySelector('main')) hydrateRoot(root, <App path={path} />);
else createRoot(root).render(<App path={path} />);
