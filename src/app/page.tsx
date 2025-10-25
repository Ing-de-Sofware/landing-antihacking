import Header from '@/components/header';
import Hero from '@/app/sections/hero';
import About from '@/app/sections/about';
import Services from '@/app/sections/services';
import Methodology from '@/app/sections/methodology';
import WhyUs from '@/app/sections/why-us';
import Contact from '@/app/sections/contact';
import Footer from '@/components/footer';
import { Testimonials } from './sections/testimonials';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <About />
        <Methodology />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
