import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

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
        <App {...props}>
          {({ Component, props }: { Component: React.ComponentType<any>; props: any }) => (
            <Component {...props} />
          )}
        </App>
        <Toaster />
      </>
    );
  },
  progress: {
    color: '#001a8f',
  },
});
