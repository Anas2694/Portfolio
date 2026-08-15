import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const Analytics = import.meta.env.PROD
  ? lazy(() => import('@vercel/analytics/react').then((module) => ({ default: module.Analytics })))
  : null;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {Analytics ? (
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
    ) : null}
  </StrictMode>
);
