import { createContext } from 'react';

// Filled during build-time prerendering so each page's HTML ships its own head tags.
export const HeadContext = createContext(null);
