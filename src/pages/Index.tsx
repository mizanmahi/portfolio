import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CyberGrid from "@/components/CyberGrid";
import Sidebar from "@/components/Sidebar";
import TerminalChat from "@/components/TerminalChat";
import ParticleField from "@/components/ParticleField";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "services", "portfolio", "experience", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CyberGrid />
      <Sidebar 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
        onOpenChat={() => setIsChatOpen(true)}
      />
      
      <main className="lg:ml-80 relative">
        <ParticleField />
        <Hero onNavigate={handleNavigate} onOpenChat={() => setIsChatOpen(true)} />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Experience />
        <Contact />
      </main>

      <TerminalChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
