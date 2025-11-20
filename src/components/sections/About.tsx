import { GraduationCap, Code, Users, Sparkles } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Web Development",
      description: "Expert in building modern, responsive web applications",
    },
    {
      icon: Users,
      title: "Mentorship",
      description: "Guiding developers to excel in web technologies",
    },
    {
      icon: Sparkles,
      title: "Full-Stack Engineering",
      description: "End-to-end application development expertise",
    },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-2 uppercase border-b-4 border-primary inline-block">About</h2>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-12">Professional Background</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="flex items-start gap-4 mb-6 p-6 bg-card border-2 border-foreground/20">
              <GraduationCap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-bold mb-2 uppercase tracking-wide">Education</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  BSc in Computer Science & Engineering
                  <br />
                  Fareast International University
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary pl-4">
              With over <span className="text-primary font-bold">4+ years of experience</span> in web development,
              I've worked across various roles from{" "}
              <span className="text-foreground font-medium">Web Developer</span> to{" "}
              <span className="text-foreground font-medium">Senior Mentor</span> and{" "}
              <span className="text-foreground font-medium">Lead React Developer</span>.
            </p>
          </div>

          <div className="space-y-3">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="p-4 bg-card border border-foreground/20 hover:border-primary transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 border border-primary">
                    <highlight.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1 uppercase tracking-wide">{highlight.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{highlight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-4 border-double border-primary bg-card">
          <p className="text-sm leading-relaxed text-center max-w-3xl mx-auto">
            I specialize in building{" "}
            <span className="text-primary font-bold uppercase">scalable web platforms</span> with optimal
            performance and modern tooling. My experience spans across full-stack development,{" "}
            <span className="font-bold uppercase">AI-powered applications</span>, and
            mentoring the next generation of developers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
