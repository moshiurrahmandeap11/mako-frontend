import Navbar from "@/components/Navbar";
import SplashIntro from "@/components/SplashIntro";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SplashIntro />
      <Navbar />
      {children}
    </>
  );
}
