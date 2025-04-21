import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import Header from './meta/Header';
import Footer from './meta/Footer';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => {
    if (!title) {
      return appName;
    }
    return `${title} - ${appName}`;
  },
  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <>
        <Header
          // account={{
          //   icon: 'https://github.com/AndraZero121.png',
          //   username: 'AndraZero121 (@Example)',
          // }}
        />
        <div className="min-h-[calc(100vh-60px)]">
          <App {...props} />
        </div>
        <Footer />
      </>,
    );
  },
  progress: {
    // color: '#4B5563',
    color: '#001a8f',
  },
});
