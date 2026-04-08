import Navbar from "../components/Navbar";
import HeroSection from "../components/home/HeroSection";
import IntroSection from "../components/home/IntroSection";
import LeadersSection from "../components/home/LeadersSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import ReviewsSection from "../components/home/ReviewsSection";
import OffersSection from "../components/home/OffersSection";

export default function Home() {
  return (
    <div className="bg-white text-black">
      
      <HeroSection />
      <IntroSection />
      <LeadersSection />
      <WhyChooseUsSection />
      <OffersSection />
      <ReviewsSection />
      
    </div>
  );
}