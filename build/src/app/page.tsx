import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Model from "@/components/sections/Model";
import UseCases from "@/components/sections/UseCases";
import Developers from "@/components/sections/Developers";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="relative z-10 bg-gradient-to-b from-[#05080f] via-[#0a0e1a] to-[#05080f]">
          <Products />
          <div className="py-[5px]" />
          <Model />
          <div className="py-[5px]" />
          <UseCases />
          <div className="py-[5px]" />
          <Developers />
        </div>
      </main>
      <Footer />
    </>
  );
}
