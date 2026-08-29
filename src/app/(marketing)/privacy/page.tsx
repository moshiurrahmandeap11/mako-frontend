import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | Labto AI",
  description:
    "Privacy Policy for Labto AI: Explaining what information we collect, how we use it, tenant isolation, third-party processors, and your data rights.",
  canonicalUrl: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="relative flex-1 bg-white text-[#201515] flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 max-w-9/12 mx-auto w-full  pt-10 sm:pt-14 pb-20 space-y-8 text-left">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-degular text-3xl sm:text-4xl font-medium text-[#201515] tracking-tight">
            Privacy Policy — Labto AI
          </h1>
          <p className="text-xs text-[#62646A] font-normal">
            Last updated: August 29, 2026
          </p>
        </div>

        {/* Intro Card */}
        <div className="bg-white border border-[#E4E5E7] rounded-xl p-4 space-y-8 text-sm text-[#404145] leading-relaxed ">
          <p className="font-normal text-sm sm:text-base text-[#201515] leading-relaxed">
            Labto AI (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) provides
            an AI-powered chatbot for websites - including e-commerce stores,
            SaaS products, blogs, portfolios, and other website types
            (collectively, &quot;Sites&quot;) — to assist visitors with sales,
            support, and general queries on behalf of our customers (&quot;Site
            Owners&quot;). This Privacy Policy explains what information we
            collect, how we use it, and the choices available to you.
          </p>

          {/* Section 1: Information We Collect */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              1. Information We Collect
            </h2>
            <p className="font-normal">
              To deliver AI chatbot services for your website, Labto AI collects
              the following categories of information:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <span className="text-[#201515] font-medium">
                  Account Details:
                </span>{" "}
                Name, business/personal email address, and authentication
                credentials, managed via encrypted session cookies.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Payment Information:
                </span>{" "}
                When you subscribe to a paid plan (one-time purchase or
                recurring subscription), our payment processor,{" "}
                <a
                  href="https://polar.sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1DBF73] hover:underline font-medium"
                >
                  Polar.sh
                </a>
                , collects and processes your billing details. Labto AI does not
                store full payment card numbers on its own servers (see Section
                5).
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Publicly Available Website Data:
                </span>{" "}
                We only access information that a Site Owner has already made
                publicly visible on their own website - such as page content,
                product listings, blog posts, FAQs, and policy pages - ingested
                manually or crawled automatically via Puppeteer. We do not
                access private databases, admin panels, or any non-public
                systems belonging to a Site Owner.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Knowledge Base Documents:
                </span>{" "}
                Files or text that a Site Owner voluntarily uploads to train
                their AI assistant (e.g., PDFs, docs, custom Q&A content). This
                content is used only to power that Site Owner&apos;s own
                chatbot.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Visitor Interactions:
                </span>{" "}
                Natural language chat queries submitted by website visitors,
                AI-generated responses, and transient conversation session IDs.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Technical &amp; Geolocation Metrics:
                </span>{" "}
                Anonymized visitor IP addresses processed via IP geolocation
                services, used solely for aggregate country- and city-level
                analytics inside the Site Owner&apos;s console.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Website Usage Analytics:
                </span>{" "}
                We use Google Analytics (GA4) on our own marketing website (
                <a
                  href="https://labtoai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1DBF73] hover:underline font-medium"
                >
                  labtoai.com
                </a>
                ) to understand where visitors come from and how they interact
                with our site. This is separate from the AI chat widget and does
                not track individual visitors interacting with the widget on a
                Site Owner&apos;s website.
              </li>
            </ul>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              2. How We Use Your Information
            </h2>
            <p className="font-normal">
              We process collected data exclusively to operate, maintain, and
              optimize the chatbot service:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                Generate relevant, context-aware AI responses using vector
                embeddings built from publicly crawled content and uploaded
                knowledge base documents.
              </li>
              <li>
                Ground AI answers in the Site Owner&apos;s own published content
                and knowledge base to reduce inaccurate or fabricated answers.
              </li>
              <li>
                Support optional e-commerce features, such as product
                recommendations and cart-assist actions, for Site Owners who run
                online stores.
              </li>
              <li>Track subscription plan tiers, usage quotas, and billing.</li>
              <li>
                Process payments for one-time and recurring purchases via
                Polar.sh.
              </li>
              <li>
                Analyze aggregate traffic and performance on our own marketing
                website via Google Analytics.
              </li>
              <li>
                Communicate with account holders about their account, service
                updates, or support requests.
              </li>
            </ul>
          </section>

          {/* Section 3: AI Model Training & Tenant Isolation */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              3. AI Model Training &amp; Tenant Isolation
            </h2>
            <p className="font-normal">
              Your site data is protected by strict, tenant-isolated storage:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                All crawled content, uploaded knowledge base documents, and
                vector embeddings are segregated using tenant-isolated database
                keys, so one Site Owner&apos;s data is never visible to another.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Zero Public LLM Training:
                </span>{" "}
                Your website content, uploaded documents, and visitor chat logs
                are never shared across accounts, and are never used to train
                public third-party foundation AI models.
              </li>
            </ul>
          </section>

          {/* Section 4: Cookies & Local Storage */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              4. Cookies &amp; Local Storage
            </h2>
            <p className="font-normal">
              Labto AI uses the following storage mechanisms:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <span className="text-[#201515] font-medium">
                  Account Session Cookies:
                </span>{" "}
                Encrypted, HttpOnly cookies used to secure account/dashboard
                logins.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Widget LocalStorage:
                </span>{" "}
                Client-side browser localStorage, used by the embedded chat
                widget to preserve conversation continuity for a visitor during
                a single browsing session. This is not used to track visitors
                across third-party domains.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Analytics Cookies (GA4):
                </span>{" "}
                Google Analytics sets cookies on our marketing website to
                measure traffic sources and site usage. You can opt out using
                your browser settings or the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1DBF73] hover:underline font-medium"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </li>
            </ul>
          </section>

          {/* Section 5: Third-Party Data Processors & Infrastructure */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              5. Third-Party Data Processors &amp; Infrastructure
            </h2>
            <p className="font-normal">
              We partner with the following infrastructure and service
              providers:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <span className="text-[#201515] font-medium">
                  AI Providers (OpenAI compatible &amp; Google and fallback
                  LLMs):
                </span>{" "}
                Real-time natural language query processing, under enterprise
                API zero-data-retention terms.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Cloud Storage &amp; Database (PostgreSQL):
                </span>{" "}
                SOC 2–compliant PostgreSQL hosting for crawled content, uploaded
                documents, and vector embeddings, with AES-256 encryption at
                rest. We do not have access to any Site Owner&apos;s own
                internal or private databases — only to the data described in
                Section 1.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Payment Processing (
                  <a
                    href="https://polar.sh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1DBF73] hover:underline font-medium"
                  >
                    Polar.sh
                  </a>
                  ):
                </span>{" "}
                PCI-DSS Level 1–compliant payment gateway, supporting both
                one-time and recurring (subscription) payments. Labto AI never
                stores full credit card numbers on its own servers;
                Polar.sh&apos;s own privacy policy governs how they handle your
                payment data.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Website Analytics (Google Analytics, GA4):
                </span>{" "}
                <a
                  href="https://analytics.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1DBF73] hover:underline font-medium"
                >
                  Google LLC
                </a>{" "}
                processes aggregated, pseudonymized website usage data on our
                behalf for our own marketing site, subject to Google&apos;s
                privacy policy and data processing terms.
              </li>
            </ul>
          </section>

          {/* Section 6: Data Retention */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              6. Data Retention
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <span className="text-[#201515] font-medium">
                  Chat &amp; session data:
                </span>{" "}
                Visitor conversation session IDs and related chat logs are
                retained for [X days/months], after which they are deleted or
                anonymized.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Crawled content &amp; knowledge base documents:
                </span>{" "}
                Retained for as long as your account remains active, or until
                you request deletion.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Billing records:
                </span>{" "}
                Retained as required by applicable tax and accounting laws,
                typically [X years].
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Analytics data:
                </span>{" "}
                Google Analytics data is retained according to our configured
                GA4 retention settings (Google&apos;s default is 14 months).
              </li>
            </ul>
          </section>

          {/* Section 7: International Data Transfers */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              7. International Data Transfers
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              Your information may be processed and stored on servers located
              outside your country of residence, including in the United States.
              Where required, we rely on appropriate safeguards (such as
              Standard Contractual Clauses) to protect data transferred
              internationally.
            </p>
          </section>

          {/* Section 8: Your Data Rights (GDPR / CCPA) */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              8. Your Data Rights (GDPR / CCPA)
            </h2>
            <p className="font-normal">
              Under applicable data protection laws (GDPR, CCPA, and similar),
              account holders maintain full ownership of their site data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <span className="text-[#201515] font-medium">
                  Right to Access:
                </span>{" "}
                View and export crawled content, uploaded documents, and
                conversation history at any time.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Right to Delete:
                </span>{" "}
                Remove crawled pages, delete uploaded knowledge base documents,
                delete indexed vectors, or close your account directly from your
                account settings.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Right to Correct:
                </span>{" "}
                Update inaccurate account or knowledge base information at any
                time.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Right to Object/Restrict:
                </span>{" "}
                Contact us to object to or restrict certain processing of your
                data, subject to legal limitations.
              </li>
            </ul>
            <p className="font-normal text-xs sm:text-sm text-[#62646A] pt-1">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:contact@labtoai.com"
                className="text-[#1DBF73] hover:underline font-medium"
              >
                contact@labtoai.com
              </a>
              .
            </p>
          </section>

          {/* Section 9: Children's Privacy */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              9. Children&apos;s Privacy
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              Labto AI&apos;s services are intended for use by businesses,
              creators, and individuals aged 18 and older who own or manage a
              website. We do not knowingly collect personal information from
              individuals under the age of 16. If you believe a child has
              provided us with personal information, please contact us so we can
              delete it.
            </p>
          </section>

          {/* Section 10: Data Security */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              10. Data Security
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              We implement industry-standard technical and organizational
              measures — including encryption at rest (AES-256) and in transit,
              tenant-isolated data storage, and encrypted HttpOnly session
              cookies — to protect your information. No system is 100% secure,
              and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 11: Changes to This Policy */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              11. Changes to This Policy
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              We may update this Privacy Policy from time to time. Material
              changes will be communicated via email or a notice on our
              dashboard/website. Continued use of our services after changes
              take effect constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Section 12: Contact Us */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              12. Contact Us
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              If you have questions about this Privacy Policy or how we handle
              your data, contact us at:
            </p>
            <div className="pt-1">
              <a
                href="mailto:contact@labtoai.com"
                className="inline-flex items-center gap-2 text-[#1DBF73] hover:underline font-medium text-sm"
              >
                <span>📧</span> contact@labtoai.com
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
