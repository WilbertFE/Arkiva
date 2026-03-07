import { HomeNavbar } from "@/components/home/HomeNavbar";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeFeatures } from "@/components/home/HomeFeatures";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeBenefits } from "@/components/home/HomeBenefits";
import { HomeCTA } from "@/components/home/HomeCTA";
import { HomeFooter } from "@/components/home/HomeFooter";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeNavbar />
      <main className="flex-grow">
        <HomeHero />
        <HomeFeatures />
        <HomeHowItWorks />
        <HomeBenefits />
        <HomeCTA />
      </main>
      <HomeFooter />
    </div>
  );
}
