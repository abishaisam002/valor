import React, { useState } from 'react';
import LoadingBar from '../components/home/LoadingBar';
import Navigation from '../components/home/Navigation';
import HeroSection from '../components/home/HeroSection';
import ParticleSphereSection from '../components/home/ParticleSphereSection';
import PathAnimation from '../components/home/PathAnimation';
import ServicesSection from '../components/home/ServicesSection';
import CTASection from '../components/home/CTASection';
import FAQSection from '../components/home/FAQSection';
import ValorScrollSection from '../components/home/ValorScrollSection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="page-main">
      {isLoading && <LoadingBar onComplete={() => setIsLoading(false)} />}
      <Navigation />
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <ParticleSphereSection />
          <PathAnimation />
          <ServicesSection />
          <CTASection />
          <FAQSection />
          <ValorScrollSection />
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
