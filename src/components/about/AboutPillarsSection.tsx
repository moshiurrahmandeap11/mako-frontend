import { Search, ShieldAlert, ShoppingCart, Lock } from "lucide-react";

export default function AboutPillarsSection() {
  const pillars = [
    {
      icon: <Search className="w-6 h-6 text-[#1DBF73]" />,
      title: "Instant Smart Search",
      description:
        "Understands natural conversational questions from shoppers and finds matching products in less than a second.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-[#1DBF73]" />,
      title: "Accurate Store Answers",
      description:
        "Learns directly from your official store FAQs, shipping details, and policies to give shoppers reliable answers every time.",
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-[#1DBF73]" />,
      title: "1-Click Direct Add-to-Cart",
      description:
        "Shoppers can select product sizes or options and add items directly to their shopping cart right inside the chat window.",
    },
    {
      icon: <Lock className="w-6 h-6 text-[#1DBF73]" />,
      title: "100% Data Privacy & Security",
      description:
        "Your product catalog and customer conversations are completely private and never shared or used for public AI model training.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#E4E5E7]">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto text-left space-y-10">
        <div className="space-y-3">
          <h2 className="font-degular text-2xl sm:text-3xl lg:text-4xl font-medium text-[#201515] tracking-tight">
            Built on Four Core Engineering Pillars
          </h2>
          <p className="text-[#62646A] text-xs sm:text-sm max-w-2xl">
            Our architectural decisions prioritize latency, accuracy, merchant control, and privacy above all else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-md bg-white border border-[#E4E5E7] space-y-3 hover:border-[#1DBF73]/50 transition-colors"
            >
              <div>{pillar.icon}</div>
              <h3 className="font-degular text-base font-semibold text-[#201515]">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#62646A] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
