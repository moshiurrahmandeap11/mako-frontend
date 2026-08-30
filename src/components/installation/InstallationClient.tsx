"use client";

import Button from "@/components/Button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Code2,
  Copy,
  FileCode,
  Globe,
  Layers,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function InstallationClient() {
  // YouTube Video ID (easily configurable/replaceable)
  // Default placeholder video ID for installation guide
  const [youtubeVideoId, setYoutubeVideoId] = useState("dQw4w9WgXcQ"); // Demo ID: user can replace anytime
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [activePlatform, setActivePlatform] = useState<
    "html" | "shopify" | "wordpress" | "nextjs" | "webflow"
  >("shopify");

  const handleCopy = (code: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedIndex(id);
      toast.success("Code snippet copied to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2500);
    }
  };

  const genericScript = `<script
  src="https://labtoai.com/widget.js"
  data-merchant-id="YOUR_MERCHANT_KEY"
  async
></script>`;

  const shopifyLiquidCode = `<!-- Labto AI Chatbot Widget -->
<script
  src="https://labtoai.com/widget.js"
  data-merchant-id="YOUR_MERCHANT_KEY"
  async
></script>`;

  const wordpressCode = `<!-- Paste into Header & Footer plugin, or theme's footer.php before </body> -->
<script
  src="https://labtoai.com/widget.js"
  data-merchant-id="YOUR_MERCHANT_KEY"
  async
></script>`;

  const nextjsCode = `// In your app/layout.tsx or pages/_app.tsx
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://labtoai.com/widget.js"
          data-merchant-id="YOUR_MERCHANT_KEY"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}`;

  const webflowCode = `<!-- In Webflow Project Settings > Custom Code > Footer Code -->
<script
  src="https://labtoai.com/widget.js"
  data-merchant-id="YOUR_MERCHANT_KEY"
  async
></script>`;

  const platforms = [
    { id: "shopify", name: "Shopify", icon: ShoppingBag },
    { id: "wordpress", name: "WordPress & WooCommerce", icon: Globe },
    { id: "html", name: "HTML & Static Site", icon: FileCode },
    { id: "nextjs", name: "Next.js & React", icon: Code2 },
    { id: "webflow", name: "Webflow & Wix", icon: Layers },
  ] as const;

  return (
    <div className="w-full space-y-16 text-left">
      {/* Video Guide Card Section */}
      <div className="bg-white border border-[#E4E5E7] rounded-md p-4 space-y-6">
        {/* Responsive YouTube Player Container */}
        <div className="relative w-full aspect-video rounded-md overflow-hidden bg-black border border-[#E4E5E7]">
          <iframe
            className="w-full h-full"
            src={
              "https://www.youtube.com/embed/" +
              youtubeVideoId +
              "?rel=0&modestbranding=1"
            }
            title="Labto AI Widget Installation Guide"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {/* Quick 3-Step Overview */}
      <div className="space-y-6">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-2xl text-[#222325]">3 Simple Steps to Install</h2>
          <p className="text-xs sm:text-sm text-[#71717A]">
            No coding skills required. You can have your AI assistant live in
            less than 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md border border-[#E4E5E7] space-y-3 relative overflow-hidden">
            <h3 className=" text-base text-[#222325]">Copy Your Script</h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Grab your single-line embed snippet from the installation box
              below or directly from your Dashboard.
            </p>
          </div>

          <div className="bg-white p-6 rounded-md border border-[#E4E5E7] space-y-3 relative overflow-hidden">
            <h3 className=" text-base text-[#222325]">Paste into Your Store</h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Paste the snippet before the closing{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">
                &lt;/body&gt;
              </code>{" "}
              tag in your store theme or footer settings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-md border border-[#E4E5E7] space-y-3 relative overflow-hidden">
            <h3 className="text-base text-[#222325]">Instant Live AI Chat</h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Refresh your store. Your autonomous AI shopping assistant is live,
              answering questions and closing sales!
            </p>
          </div>
        </div>
      </div>

      {/* Universal Embed Snippet Box */}
      <div className="bg-white border border-[#E4E5E7] rounded-md p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-[#222325] flex items-center gap-2">
              Script
            </h3>
            <p className="text-xs text-[#71717A]">
              Compatible with any website builder, CMS, or custom framework.
            </p>
          </div>
          <Button
            onClick={() => handleCopy(genericScript, "generic")}
            variant="primary"
            size="sm"
            className="shrink-0 self-start sm:self-auto"
            icon={
              copiedIndex === "generic" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )
            }
          >
            {copiedIndex === "generic" ? "Copied!" : "Copy Snippet"}
          </Button>
        </div>

        <div className="relative rounded-md overflow-hidden bg-[#18181B] text-white p-4 font-mono text-xs leading-relaxed border border-gray-800">
          <pre className="overflow-x-auto">{genericScript}</pre>
        </div>
        <p className="text-[11px] text-[#A0A2A8]">
          * Note: Replace{" "}
          <span className="font-mono text-[#1DBF73]">YOUR_MERCHANT_KEY</span>{" "}
          with your public API key found in your{" "}
          <Link
            href="/dashboard"
            className="text-[#1DBF73] underline font-medium"
          >
            Dashboard API Keys
          </Link>{" "}
          tab.
        </p>
      </div>

      {/* Platform-Specific Step-by-Step Instructions */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl text-[#222325]">Platform-Specific Guides</h2>
          <p className="text-xs sm:text-sm text-[#71717A]">
            Select your platform below for tailored instructions:
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex items-center overflow-x-auto pb-1 scrollbar-none">
          <div className="inline-flex items-center gap-1 p-1 bg-[#F4F4F5] border border-[#E4E5E7] rounded-md shrink-0">
            {platforms.map((p) => {
              const Icon = p.icon;
              const isActive = activePlatform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePlatform(p.id)}
                  className={`relative z-10 flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 shrink-0 whitespace-nowrap cursor-pointer select-none focus:outline-none ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#71717A] hover:text-[#18181B]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="platformActiveTabPill"
                      className="absolute inset-0 bg-[#18181B] rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Platform Content Card */}
        <div className="bg-white border border-[#E4E5E7] rounded-md p-4 space-y-6">
          <AnimatePresence mode="wait">
            {activePlatform === "shopify" && (
              <motion.div
                key="shopify"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="text-lg text-[#222325] flex items-center gap-2">
                  Shopify Installation
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-[#71717A] leading-relaxed">
                  <li>
                    Log in to your <strong>Shopify Admin</strong> dashboard.
                  </li>
                  <li>
                    Navigate to <strong>Online Store &gt; Themes</strong>.
                  </li>
                  <li>
                    Click the{" "}
                    <strong>Actions (three dots) &gt; Edit Code</strong> on your
                    live theme.
                  </li>
                  <li>
                    In the left sidebar, open{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[#222325]">
                      theme.liquid
                    </code>{" "}
                    under the <em>Layout</em> folder.
                  </li>
                  <li>
                    Scroll down to the very bottom and find the closing{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[#222325]">
                      &lt;/body&gt;
                    </code>{" "}
                    tag.
                  </li>
                  <li>
                    Paste the code snippet immediately above{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[#222325]">
                      &lt;/body&gt;
                    </code>
                    .
                  </li>
                  <li>
                    Click <strong>Save</strong> in the top right corner. You are
                    all set!
                  </li>
                </ol>

                <div className="relative rounded-md overflow-hidden bg-[#18181B] text-white p-4 text-sm leading-relaxed mt-4">
                  <Button
                    onClick={() => handleCopy(shopifyLiquidCode, "shopify")}
                    size="sm"
                    className="absolute top-3 right-3 !px-3 !py-1.5 !rounded-md !bg-white/10 hover:!bg-white/20 !text-white !text-[11px] !font-normal !shadow-none !border-none shrink-0 z-10"
                    icon={
                      copiedIndex === "shopify" ? (
                        <Check className="w-3.5 h-3.5 text-[#1DBF73]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
                  >
                    {copiedIndex === "shopify" ? "Copied" : "Copy Code"}
                  </Button>
                  <pre className="overflow-x-auto">{shopifyLiquidCode}</pre>
                </div>
              </motion.div>
            )}

            {activePlatform === "wordpress" && (
              <motion.div
                key="wordpress"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="text-lg text-[#222325] flex items-center gap-2">
                  Wordpress & WooCommerce Installation
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-[#71717A] leading-relaxed">
                  <li>
                    Log in to your <strong>WordPress Admin</strong> dashboard.
                  </li>
                  <li>
                    Install the free plugin{" "}
                    <strong>
                      &quot;WPCode&quot; (Insert Headers and Footers)
                    </strong>{" "}
                    from Plugins &gt; Add New.
                  </li>
                  <li>
                    Go to{" "}
                    <strong>Code Snippets &gt; Header &amp; Footer</strong>.
                  </li>
                  <li>
                    Paste the script in the <strong>Footer</strong> box.
                  </li>
                  <li>
                    Click <strong>Save Changes</strong>. The AI assistant is now
                    live across your entire store!
                  </li>
                </ol>

                <div className="relative rounded-md overflow-hidden bg-[#18181B] text-white p-4 font-mono text-xs leading-relaxed mt-4">
                  <Button
                    onClick={() => handleCopy(wordpressCode, "wordpress")}
                    size="sm"
                    className="absolute top-3 right-3 !px-3 !py-1.5 !rounded-md !bg-white/10 hover:!bg-white/20 !text-white !text-[11px] !font-normal !shadow-none !border-none shrink-0 z-10"
                    icon={
                      copiedIndex === "wordpress" ? (
                        <Check className="w-3.5 h-3.5 text-[#1DBF73]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
                  >
                    {copiedIndex === "wordpress" ? "Copied" : "Copy Code"}
                  </Button>
                  <pre className="overflow-x-auto">{wordpressCode}</pre>
                </div>
              </motion.div>
            )}

            {activePlatform === "html" && (
              <motion.div
                key="html"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="text-lg text-[#222325] flex items-center gap-2">
                  Standard HTML &amp; Custom Site
                </h3>
                <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                  Simply paste this script tag right before the closing{" "}
                  <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[#222325]">
                    &lt;/body&gt;
                  </code>{" "}
                  tag of your HTML pages:
                </p>

                <div className="relative rounded-md overflow-hidden bg-[#18181B] text-white p-4 text-sm leading-relaxed mt-4">
                  <Button
                    onClick={() => handleCopy(genericScript, "html")}
                    size="sm"
                    className="absolute top-3 right-3 !px-3 !py-1.5 !rounded-md !bg-white/10 hover:!bg-white/20 !text-white !text-[11px] !font-normal !shadow-none !border-none shrink-0 z-10"
                    icon={
                      copiedIndex === "html" ? (
                        <Check className="w-3.5 h-3.5 text-[#1DBF73]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
                  >
                    {copiedIndex === "html" ? "Copied" : "Copy Code"}
                  </Button>
                  <pre className="overflow-x-auto">{genericScript}</pre>
                </div>
              </motion.div>
            )}

            {activePlatform === "nextjs" && (
              <motion.div
                key="nextjs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="text-lg text-[#222325] flex items-center gap-2">
                  Next.js &amp; React Installation
                </h3>
                <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                  Use Next.js built-in{" "}
                  <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[#222325]">
                    next/script
                  </code>{" "}
                  in your root layout for non-blocking asynchronous loading:
                </p>

                <div className="relative rounded-md overflow-hidden bg-[#18181B] text-white p-4 font-mono text-xs leading-relaxed mt-4">
                  <Button
                    onClick={() => handleCopy(nextjsCode, "nextjs")}
                    size="sm"
                    className="absolute top-3 right-3 !px-3 !py-1.5 !rounded-md !bg-white/10 hover:!bg-white/20 !text-white !text-[11px] !font-normal !shadow-none !border-none shrink-0 z-10"
                    icon={
                      copiedIndex === "nextjs" ? (
                        <Check className="w-3.5 h-3.5 text-[#1DBF73]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
                  >
                    {copiedIndex === "nextjs" ? "Copied" : "Copy Code"}
                  </Button>
                  <pre className="overflow-x-auto">{nextjsCode}</pre>
                </div>
              </motion.div>
            )}

            {activePlatform === "webflow" && (
              <motion.div
                key="webflow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="text-lg text-[#222325] flex items-center gap-2">
                  Webflow &amp; Wix Installation
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-[#71717A] leading-relaxed">
                  <li>
                    In your <strong>Webflow Dashboard</strong>, open your
                    Project Settings.
                  </li>
                  <li>
                    Click on the <strong>Custom Code</strong> tab.
                  </li>
                  <li>
                    Paste the script snippet into the{" "}
                    <strong>Footer Code</strong> section.
                  </li>
                  <li>
                    Click <strong>Save Changes</strong> and{" "}
                    <strong>Publish</strong> your site.
                  </li>
                </ol>

                <div className="relative rounded-md overflow-hidden bg-[#18181B] text-white p-4 font-mono text-xs leading-relaxed mt-4">
                  <Button
                    onClick={() => handleCopy(webflowCode, "webflow")}
                    size="sm"
                    className="absolute top-3 right-3 !px-3 !py-1.5 !rounded-md !bg-white/10 hover:!bg-white/20 !text-white !text-[11px] !font-normal !shadow-none !border-none shrink-0 z-10"
                    icon={
                      copiedIndex === "webflow" ? (
                        <Check className="w-3.5 h-3.5 text-[#1DBF73]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )
                    }
                  >
                    {copiedIndex === "webflow" ? "Copied" : "Copy Code"}
                  </Button>
                  <pre className="overflow-x-auto">{webflowCode}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white border border-[#E4E5E7] rounded-md p-4 space-y-6">
        <h2 className="text-xl text-[#222325]">Installation FAQs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <h4 className=" text-[#222325]">
              Where do I find my Merchant Key?
            </h4>
            <p className="text-[#71717A] leading-relaxed">
              Log in to your Labto AI account and go to the{" "}
              <Link
                href="/dashboard"
                className="text-[#1DBF73] font-semibold underline"
              >
                API Keys
              </Link>{" "}
              tab in your Dashboard. You can copy your key with one click.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className=" text-[#222325]">
              Will it slow down my website?
            </h4>
            <p className="text-[#71717A] leading-relaxed">
              No. Our script is ultra-lightweight (under 15KB) and loaded
              asynchronously (
              <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">
                async
              </code>
              ) from a global Edge CDN, causing zero impact on your Core Web
              Vitals or page load speed.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className=" text-[#222325]">
              Can I customize the widget appearance?
            </h4>
            <p className="text-[#71717A] leading-relaxed">
              Yes! You can customize the bot name, theme color, welcome message,
              launcher icon, and tone directly from your{" "}
              <Link
                href="/dashboard"
                className="text-[#1DBF73] font-semibold underline"
              >
                Widget Settings
              </Link>{" "}
              tab without updating the code.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className=" text-[#222325]">Need help installing?</h4>
            <p className="text-[#71717A] leading-relaxed">
              Our engineering team is happy to assist with your store setup for
              free. Drop us a note via our{" "}
              <Link
                href="/contact"
                className="text-[#1DBF73] font-semibold underline"
              >
                Contact Page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
