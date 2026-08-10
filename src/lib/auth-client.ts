import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000').replace(/\/$/, '');

export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        allowedDomains: { type: 'string[]', required: false },
        planTier: { type: 'string', required: false },
      },
    }),
  ],
});
