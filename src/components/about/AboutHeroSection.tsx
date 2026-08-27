export default function AboutHeroSection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#E4E5E7]">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto text-left space-y-6">
        {/* Title */}
        <h1 className="font-degular text-3xl sm:text-4xl lg:text-5xl font-medium text-[#201515] tracking-tight leading-tight max-w-3xl">
          Empowering E-Commerce Stores with Autonomous AI Sales Assistants
        </h1>

        {/* Description */}
        <p className="text-[#62646A] text-sm sm:text-base leading-relaxed max-w-2xl">
          Labto AI helps online stores turn casual visitors into happy buyers. Our smart AI shopping assistant instantly recommends products, answers store policy questions accurately, and helps shoppers add items straight to their cart 24/7.
        </p>

        {/* Stats List */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#1DBF73]">&lt; 1.2s</span>
            <p className="text-xs sm:text-sm text-[#62646A] font-medium">AI Query Latency</p>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#1DBF73]">100%</span>
            <p className="text-xs sm:text-sm text-[#62646A] font-medium">Unused Credit Rollover</p>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#1DBF73]">1-Min</span>
            <p className="text-xs sm:text-sm text-[#62646A] font-medium">1-Line Script Embed</p>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#1DBF73]">100%</span>
            <p className="text-xs sm:text-sm text-[#62646A] font-medium">Tenant Data Isolation</p>
          </div>
        </div>
      </div>
    </section>
  );
}
