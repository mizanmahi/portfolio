import { useState } from "react";
import { Menu, X, Github, Linkedin, Mail, Terminal } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenChat: () => void;
}

const Sidebar = ({ activeSection, onNavigate, onOpenChat }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/mizanurrahman", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/mizanurrahman", label: "LinkedIn" },
    { icon: Mail, href: "mailto:mizan@example.com", label: "Email" },
  ];

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden p-2 bg-card border border-primary hover:bg-primary hover:text-background transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-sidebar border-r border-primary/20 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto`}
      >
        <div className="p-8 flex flex-col h-full">
          {/* Profile Section */}
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6 group border-2 border-foreground/20">
              <img
                src={profileImage}
                alt="Mizanur Rahman"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
              />
              <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h2 className="text-xl font-serif font-bold text-center mb-2 uppercase tracking-tight border-b-2 border-primary pb-2">
              Mizanur Rahman
            </h2>
            
            <p className="text-xs text-muted-foreground text-center leading-relaxed uppercase tracking-wider">
              Full-Stack Web Developer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-card border border-foreground/20 hover:bg-primary hover:text-background transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full text-left px-4 py-2 transition-all relative uppercase text-xs tracking-wider ${
                      activeSection === item.id
                        ? "bg-primary text-background font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-card border-l-2 border-transparent hover:border-primary"
                    }`}
                  >
                    {activeSection === item.id && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-background" />
                    )}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Talk With Me Button */}
          <div className="mb-6">
            <button
              onClick={onOpenChat}
              className="w-full border-2 border-primary bg-primary/10 px-4 py-3 font-mono text-sm uppercase tracking-wider text-primary hover:bg-primary hover:text-background transition-all"
            >
              <Terminal className="inline-block mr-2 h-4 w-4" />
              Talk With Me
            </button>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-foreground/20">
            <p className="text-xs text-muted-foreground text-center uppercase tracking-widest">
              © 2025
            </p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
