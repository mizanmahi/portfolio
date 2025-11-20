import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 px-6">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-serif font-black mb-2 uppercase border-b-4 border-primary inline-block">Contact</h2>
        <p className="text-sm text-muted-foreground mb-12 border-l-2 border-primary pl-4 mt-6">
          Have a project in mind or just want to connect? Let's talk!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="p-4 bg-card border-2 border-foreground/20">
              <div className="flex items-start gap-3">
                <div className="p-2 border border-primary">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-xs uppercase tracking-wide">Email</h3>
                  <a
                    href="mailto:mizan@example.com"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    mizan@example.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 bg-card border-2 border-foreground/20">
              <div className="flex items-start gap-3">
                <div className="p-2 border border-primary">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-xs uppercase tracking-wide">Location</h3>
                  <p className="text-xs text-muted-foreground">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-4 border-double border-foreground/30 bg-card">
              <p className="text-xs text-muted-foreground leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Input
                name="name"
                placeholder="YOUR NAME"
                value={formData.name}
                onChange={handleChange}
                className="bg-card border-2 border-foreground/30 focus:border-primary text-xs uppercase tracking-wider"
              />
            </div>
            
            <div>
              <Input
                name="email"
                type="email"
                placeholder="YOUR EMAIL"
                value={formData.email}
                onChange={handleChange}
                className="bg-card border-2 border-foreground/30 focus:border-primary text-xs uppercase tracking-wider"
              />
            </div>
            
            <div>
              <Textarea
                name="message"
                placeholder="YOUR MESSAGE"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="bg-card border-2 border-foreground/30 focus:border-primary resize-none text-xs"
              />
            </div>
            
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-background font-bold uppercase tracking-wider text-xs transition-all"
            >
              Send Message
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
