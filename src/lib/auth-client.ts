import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields, emailOTPClient } from 'better-auth/client/plugins';

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!envUrl) return '';
  return `${envUrl.replace(/\/$/, '')}/api/auth`;
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
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
