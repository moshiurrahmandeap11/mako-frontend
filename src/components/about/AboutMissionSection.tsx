import { Target, Lightbulb, ShoppingBag, MessageSquareText } from "lucide-react";

export default function AboutMissionSection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#E4E5E7]">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto text-left space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1DBF73] uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Mission & Vision</span>
          </div>
          <h2 className="font-degular text-2xl sm:text-3xl lg:text-4xl font-medium text-[#201515] tracking-tight">
            Why We Built Labto AI
          </h2>
          <p className="text-[#62646A] text-xs sm:text-sm max-w-2xl">
            E-commerce storefronts have evolved, but online customer assistance remains broken. We are changing how merchants interact with their shoppers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: The Problem */}
          <div className="p-8 rounded-md bg-white border border-[#E4E5E7] space-y-4">
            <MessageSquareText className="w-6 h-6 text-rose-500" />
            <h3 className="font-degular text-xl font-medium text-[#201515]">
              The Traditional Storefront Problem
            </h3>
            <p className="text-xs sm:text-sm text-[#62646A] leading-relaxed">
              Standard search bars rely on exact keyword matching, missing what shoppers actually mean. Static FAQ pages force visitors to dig through long documents or wait hours for support emails, resulting in high bounce rates and abandoned carts.
            </p>
          </div>

          {/* Card 2: The Solution */}
          <div className="p-8 rounded-md bg-white border border-[#1DBF73]/30 bg-gradient-to-br from-white to-[#1DBF73]/5 space-y-4">
            <ShoppingBag className="w-6 h-6 text-[#1DBF73]" />
            <h3 className="font-degular text-xl font-medium text-[#201515]">
              The Autonomous AI Concierge Solution
            </h3>
            <p className="text-xs sm:text-sm text-[#62646A] leading-relaxed">
              Labto AI turns every store into a guided personal shopping experience. Our AI agent understands natural shopper intent, recommends exact matching products, answers policy questions accurately, and performs 1-click cart injections in under a second.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
