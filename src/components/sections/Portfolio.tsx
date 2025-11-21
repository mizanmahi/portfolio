import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";


const Portfolio = () => {
  const projects = [
  {
    title: "Edulavo",
    description:
      "AI-powered course builder that turns a simple prompt into a complete learning path with modules, lessons, and quizzes.",
    tech: ["Python","GRPC","Next.js", "AGNO", "OPENROUTER", "MongoDB", "TRPC"],
    gradient: "from-secondary/20 to-neon-pink/20",
    link: "https://www.edulavo.com/",
    github: "#",
    thumbnail: "https://i.ibb.co.com/JwCrHwXH/product-demo-new.webp",
  },

  {
    title: "Programming Hero",
    description:
      "A gamified coding platform that teaches web development and programming fundamentals through fun, career-focused lessons.",
    tech: ["Web Development", "MERN", "Python", "Algorithms", "Data Structures"],
    gradient: "from-indigo-300 to-blue-500",
    link: "https://www.programming-hero.com/",
    github: "#",
    thumbnail: "https://i.ibb.co.com/5W40ZDWt/image.png",
  },

  {
    title: "Solruf",
    description:
      "A solar marketplace that connects buyers and sellers with tools for discovery, procurement, and project management.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    gradient: "from-primary/20 to-secondary/20",
    link: "https://www.solruf.com/",
    github: "#",
    thumbnail: "https://i.ibb.co.com/qLY3FM27/solruf.jpg",
  }
];


  return (
    <section id="portfolio" className="min-h-screen flex items-center py-20 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-serif font-black mb-2 uppercase border-b-4 border-primary inline-block">Portfolio</h2>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-12">Featured Work</p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="border-2 border-foreground/20 hover:border-primary transition-all overflow-hidden group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Project image placeholder */}
              <div className="h-[300px] bg-card border-b-2 border-foreground/20 flex items-center justify-center relative overflow-hidden retro-dots">
                <div className="text-6xl font-serif font-black text-foreground/10">
                  <img src={project.thumbnail} alt={project.title} />
                </div>
              </div>

              <div className="p-6 bg-card">
                <h3 className="text-xl font-serif font-bold mb-2 uppercase">{project.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-foreground/20">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-background border border-foreground/30 text-xs uppercase tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-foreground hover:bg-foreground hover:text-background flex-1 text-xs uppercase tracking-wider"
                    asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      View
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-foreground hover:bg-foreground hover:text-background"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
