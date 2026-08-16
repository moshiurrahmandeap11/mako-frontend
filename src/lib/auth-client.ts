import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields, emailOTPClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: '', // Proxied via Next.js rewrites for first-party cookie support
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [
    emailOTPClient(),
    inferAdditionalFields({
      user: {
        allowedDomains: { type: 'string[]', required: false },
        planTier: { type: 'string', required: false },
      },
    }),
  ],
});
