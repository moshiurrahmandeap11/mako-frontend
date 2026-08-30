import Navbar from "@/components/Navbar";
import FooterSection from "@/components/home/FooterSection";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <FooterSection />
    </div>
  );
}
