import { Loader } from "@/components/common/Loader";
import { FloatCta } from "@/components/common/FloatCta";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Model from "@/components/sections/Model";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Capabilities from "@/components/sections/Capabilities";
import RevokeDemo from "@/components/sections/RevokeDemo";
import Poc from "@/components/sections/Poc";
import UseCases from "@/components/sections/UseCases";
import Ideas from "@/components/sections/Ideas";
import Ecosystem from "@/components/sections/Ecosystem";
import Developers from "@/components/sections/Developers";
import MobileBand from "@/components/sections/MobileBand";
import Faq from "@/components/sections/Faq";
import Team from "@/components/sections/Team";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <div className="relative z-10 bg-black">
          <Products />
          <Model />
          <HowItWorks />
          <Features />
          <Capabilities />
          <RevokeDemo />
          <UseCases />
          <Poc />
          <Ideas />
          <Ecosystem />
          <Developers />
          <MobileBand />
          <Faq />
          <Team />
          <FinalCta />
        </div>
      </main>
      <Footer />
      <FloatCta />
    </>
  );
}
