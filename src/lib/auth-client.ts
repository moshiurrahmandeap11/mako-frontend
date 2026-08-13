import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

const API_BASE_URL = ''; // Proxied via Next.js rewrites

export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [
    inferAdditionalFields({
      user: {
        allowedDomains: { type: 'string[]', required: false },
        planTier: { type: 'string', required: false },
      },
    }),
  ],
});
