import Header from "@/components/header";
import HeroBanner from "@/components/hero-banner";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import GallerySection from "@/components/gallery-section";
import TestimonialsSection from "@/components/testimonials-section";
import ServiceAreaSection from "@/components/service-area-section";
import ContactSection from "@/components/contact-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="font-sans text-dark bg-light antialiased">
      <Header />
      <HeroBanner />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <ServiceAreaSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </div>
  );
}
