import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import MilestoneSection from '../components/MilestoneSection';
import ProjectSection from '../components/ProjectSection';
import TechStackSection from '../components/TechStackSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <div className="relative w-full">
      <main className="md:ml-20">
        <HeroSection />
        <AboutSection />
        <MilestoneSection />
        <ProjectSection />
        <TechStackSection />
      </main>
      <ContactSection />
    </div>
  );
}
