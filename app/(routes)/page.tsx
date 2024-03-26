// Components import
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";

const HomePage = () => {
  return (
    <section className="h-screen">
      <Navbar />
      <Hero />
    </section>
  );
};

export default HomePage;
