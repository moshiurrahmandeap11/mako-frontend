import { Server, Database, Bot, CreditCard } from "lucide-react";

export default function AboutTechArchitectureSection() {
  const techStack = [
    {
      icon: <Database className="w-6 h-6 text-[#1DBF73]" />,
      name: "Neon PostgreSQL & pgvector",
      detail:
        "High-performance cloud database with 1536-dimensional vector similarity indexing, providing sub-second semantic retrieval across tens of thousands of SKUs.",
    },
    {
      icon: <Bot className="w-6 h-6 text-[#1DBF73]" />,
      name: "OpenAI & Anthropic Orchestration",
      detail:
        "Dual-engine AI routing system utilizing text-embedding-3-small vectors and frontier LLMs under zero-data-retention enterprise terms.",
    },
    {
      icon: <Server className="w-6 h-6 text-[#1DBF73]" />,
      name: "Lightweight Preact Widget",
      detail:
        "Compiled via esbuild into a sub-15KB bundle served asynchronously via CDN for zero impact on storefront page speed and Core Web Vitals.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#1DBF73]" />,
      name: "Polar.sh Billing",
      detail:
        "PCI-DSS Level 1 compliant subscription processing with automated credit tracking and 100% unused credit rollover on active plans.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto text-left space-y-10">
        <div className="space-y-3">
          <h2 className="font-degular text-2xl sm:text-3xl lg:text-4xl font-medium text-[#201515] tracking-tight">
            Infrastructure & Technology Stack
          </h2>
          <p className="text-[#62646A] text-xs sm:text-sm max-w-2xl">
            Designed for high concurrency, low latency, and seamless platform integration across Shopify, WooCommerce, and modern headless web stacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="p-6 rounded-md bg-[#FAFAFA] border border-[#E4E5E7] space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0">{tech.icon}</div>
                <h3 className="font-degular text-base font-semibold text-[#201515]">
                  {tech.name}
                </h3>
              </div>
              <p className="text-xs text-[#62646A] leading-relaxed">
                {tech.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
