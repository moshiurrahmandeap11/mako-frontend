import { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";
import { constructMetadata, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contact & Enterprise Partnerships | Labto AI",
  description:
    "Get in touch with the Labto AI engineering and sales team for custom volume pricing, dedicated embedding pipelines, or technical support.",
  canonicalUrl: "/contact",
  keywords: [
    "Contact Labto AI",
    "Enterprise AI E-Commerce Partnership",
    "Custom Storefront AI Integration",
    "Labto AI Support",
  ],
});

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Labto AI Team",
    description: "Get in touch with Labto AI for sales, partnerships, and SLA support.",
    url: `${SITE_CONFIG.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "Labto AI",
      email: "support@labtoai.com",
      url: SITE_CONFIG.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactClient />
    </>
  );
}
