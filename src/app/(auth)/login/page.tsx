import { Metadata } from "next";
import LoginClient from "@/components/auth/LoginClient";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Sign In to Merchant Dashboard | Labto AI",
  description: "Sign in to manage your Labto AI storefront assistant, live analytics, and product sync.",
  canonicalUrl: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return <LoginClient />;
}
