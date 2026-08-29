import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service | Labto AI",
  description:
    "Terms of Service for Labto AI: Service agreement, account eligibility, billing terms, AI output disclaimer, acceptable use, and intellectual property.",
  canonicalUrl: "/terms",
});

export default function TermsPage() {
  return (
    <div className="relative flex-1 bg-white text-[#201515] flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 max-w-9/12 mx-auto w-full px-6 pt-10 sm:pt-14 pb-20 space-y-8 text-left">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-degular text-3xl sm:text-4xl font-medium text-[#201515] tracking-tight">
            Terms of Service — Labto AI
          </h1>
          <p className="text-xs text-[#62646A] font-normal">
            Last updated: August 29, 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white border border-[#E4E5E7] rounded-xl p-6 sm:p-8 space-y-8 text-sm text-[#404145] leading-relaxed shadow-sm">
          <p className="font-normal text-sm sm:text-base text-[#201515] leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of Labto AI&apos;s website, dashboard, and embeddable AI chatbot
            widget (collectively, the &quot;Service&quot;), operated by Labto AI
            (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;). By creating an
            account or using the Service, you (&quot;you,&quot;
            &quot;Customer,&quot; &quot;Site Owner&quot;) agree to be bound by
            these Terms. If you do not agree, do not use the Service.
          </p>

          {/* Section 1: The Service */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              1. The Service
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              Labto AI provides an AI-powered chatbot that can be embedded on
              any website — including e-commerce stores, SaaS products, blogs,
              portfolios, and other website types — to answer visitor questions,
              assist with sales, and provide customer support. The chatbot is
              powered by content you make publicly available on your website and
              any knowledge base documents you choose to upload.
            </p>
          </section>

          {/* Section 2: Eligibility & Accounts */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              2. Eligibility &amp; Accounts
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                You must be at least 18 years old and able to form a binding
                contract to use the Service.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activity that occurs under your
                account.
              </li>
              <li>
                You must provide accurate and complete information when creating
                an account and keep it up to date.
              </li>
            </ul>
          </section>

          {/* Section 3: Subscription Plans & Payment */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              3. Subscription Plans &amp; Payment
            </h2>
            <ul className="list-disc pl-5 space-y-2 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                The Service is offered under one-time purchase and recurring
                subscription plans, as described on our pricing page.
              </li>
              <li>
                All payments are processed by our third-party payment processor,
                Polar.sh. By subscribing, you agree to Polar.sh&apos;s
                applicable terms in addition to these Terms.
              </li>
              <li>
                Recurring subscriptions automatically renew at the end of each
                billing cycle unless cancelled before the renewal date. You can
                cancel at any time from your account settings; cancellation
                takes effect at the end of the current billing period.
              </li>
              <li>
                One-time purchases grant access to the purchased plan or credits
                as described at checkout, with no automatic renewal.
              </li>
              <li>
                Fees are non-refundable except where required by applicable law
                or expressly stated otherwise.
              </li>
              <li>
                We reserve the right to change pricing with advance notice.
                Continued use after a price change constitutes acceptance of the
                new pricing.
              </li>
            </ul>
          </section>

          {/* Section 4: Your Content & Data */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              4. Your Content &amp; Data
            </h2>
            <ul className="list-disc pl-5 space-y-2 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <span className="text-[#201515] font-medium">
                  Your Content:
                </span>{" "}
                You retain all ownership rights to the website content, product
                data, and knowledge base documents you provide or that we crawl
                from your publicly available website (&quot;Your Content&quot;).
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  License to Us:
                </span>{" "}
                You grant Labto AI a limited, non-exclusive license to access,
                store, process, and use Your Content solely to provide and
                improve the Service for your account, as described in our
                Privacy Policy.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  Your Responsibility:
                </span>{" "}
                You are responsible for ensuring you have the right to submit
                Your Content to us, and that it doesn&apos;t infringe on any
                third party&apos;s rights or violate applicable law.
              </li>
              <li>
                <span className="text-[#201515] font-medium">
                  No Training on Your Data:
                </span>{" "}
                We do not use Your Content to train public third-party
                foundation AI models, and we do not share Your Content across
                customer accounts.
              </li>
            </ul>
          </section>

          {/* Section 5: Acceptable Use */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              5. Acceptable Use
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                Upload or crawl content that is illegal, fraudulent, defamatory,
                or infringes on any third party&apos;s intellectual property or
                privacy rights.
              </li>
              <li>
                Attempt to access another customer&apos;s account, data, or
                isolated tenant environment.
              </li>
              <li>
                Reverse-engineer, decompile, or attempt to extract the
                underlying models or source code of the Service.
              </li>
              <li>
                Use the Service to send spam, malware, or engage in any activity
                that could harm the Service, our infrastructure, or other users.
              </li>
              <li>
                Deploy the chatbot in a way that misleads visitors into
                believing they are speaking with a human when transparency is
                legally required.
              </li>
            </ul>
            <p className="font-normal text-xs sm:text-sm text-[#62646A] pt-1">
              We reserve the right to suspend or terminate accounts that violate
              this section.
            </p>
          </section>

          {/* Section 6: AI Output Disclaimer */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              6. AI Output Disclaimer
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              The chatbot generates responses using AI models and the content
              you provide. While we ground responses in your published content
              and knowledge base to reduce inaccuracies:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                We do not guarantee that AI-generated responses will always be
                accurate, complete, or error-free.
              </li>
              <li>
                You are responsible for reviewing chatbot behavior and
                configuring it appropriately for your website and audience.
              </li>
              <li>
                Labto AI is not liable for decisions made by visitors based on
                chatbot responses, or for any transactions completed through
                AI-assisted recommendations.
              </li>
            </ul>
          </section>

          {/* Section 7: Third-Party Services */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              7. Third-Party Services
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              The Service relies on third-party providers, including but not
              limited to OpenAI and Anthropic (AI processing), Neon PostgreSQL
              (data storage), Polar.sh (payments), and Google Analytics (website
              analytics on our own marketing site). Your use of the Service is
              also subject to the applicable terms of these providers where
              relevant.
            </p>
          </section>

          {/* Section 8: Intellectual Property */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              8. Intellectual Property
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                The Service, including its software, design, branding, and
                underlying technology, is owned by Labto AI and protected by
                intellectual property laws.
              </li>
              <li>
                These Terms do not grant you any rights to our trademarks,
                logos, or brand assets except as necessary to display the
                chatbot widget as intended.
              </li>
            </ul>
          </section>

          {/* Section 9: Termination */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              9. Termination
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                You may close your account at any time from your account
                settings.
              </li>
              <li>
                We may suspend or terminate your access to the Service if you
                violate these Terms, fail to pay applicable fees, or if required
                by law.
              </li>
              <li>
                Upon termination, your right to use the Service ends
                immediately. You may request export or deletion of Your Content
                as described in our Privacy Policy, subject to legal retention
                requirements.
              </li>
            </ul>
          </section>

          {/* Section 10: Disclaimers */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              10. Disclaimers
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              The Service is provided &quot;as is&quot; and &quot;as
              available,&quot; without warranties of any kind, whether express
              or implied, including but not limited to warranties of
              merchantability, fitness for a particular purpose, or
              non-infringement. We do not warrant that the Service will be
              uninterrupted, secure, or error-free.
            </p>
          </section>

          {/* Section 11: Limitation of Liability */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              11. Limitation of Liability
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              To the maximum extent permitted by law, Labto AI shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits, revenue, data, or
              business opportunities, arising from your use of or inability to
              use the Service, even if we have been advised of the possibility
              of such damages. Our total liability for any claim arising from
              these Terms or the Service shall not exceed the amount you paid us
              in the twelve (12) months preceding the claim.
            </p>
          </section>

          {/* Section 12: Indemnification */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              12. Indemnification
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              You agree to indemnify and hold Labto AI harmless from any claims,
              damages, liabilities, and expenses (including reasonable legal
              fees) arising from your use of the Service, Your Content, or your
              violation of these Terms.
            </p>
          </section>

          {/* Section 13: Governing Law */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              13. Governing Law
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              These Terms are governed by and construed in accordance with the
              applicable laws of Bangladesh, without regard to conflict of law
              principles. Any disputes arising out of or related to these Terms
              shall be resolved in the competent courts of jurisdiction.
            </p>
          </section>

          {/* Section 14: Changes to These Terms */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">
              14. Changes to These Terms
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              We may update these Terms from time to time. Material changes will
              be communicated via email or a notice on our dashboard/website.
              Continued use of the Service after changes take effect constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          {/* Section 15: Contact Us */}
          <section className="space-y-3 pt-4 border-t border-[#E4E5E7]">
            <h2 className="text-lg font-medium text-[#201515]">15. Contact Us</h2>
            <p className="font-normal text-xs sm:text-sm text-[#62646A]">
              If you have questions about these Terms, contact us at:
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
