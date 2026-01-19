
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const hideLoader = () => {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical: Root element not found in HTML");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Hide loader after a small delay to ensure the first frame is rendered
    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
      // Fallback in case load event already fired
      setTimeout(hideLoader, 1000);
    }
  } catch (err) {
    console.error("Critical: Failed to render app", err);
    hideLoader(); // Hide loader even on error so user sees something (or a blank root)
  }
}
