import { Metadata } from "next";
import RegisterClient from "@/components/auth/RegisterClient";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Create Free Merchant Account | Labto AI",
  description: "Create your free Labto AI merchant account and start converting store visitors into buyers in under 2 minutes.",
  canonicalUrl: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return <RegisterClient />;
}
