
const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
      color: "from-primary to-primary/60",
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "Prisma", "PostgreSQL", "Redis", "REST APIs"],
      color: "from-secondary to-secondary/60",
    },
    {
      category: "DevOps & Tools",
      skills: ["Docker", "CI/CD", "Git", "GitHub Actions", "Vercel", "AWS"],
      color: "from-neon-pink to-neon-pink/60",
    },
    {
      category: "Other",
      skills: ["Python", "AI Agents", "Prompt Engineering", "System Design", "Mentorship"],
      color: "from-primary to-secondary",
    },
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-2 uppercase border-b-4 border-primary inline-block">Skills</h2>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-12">Technical Expertise</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={category.category}
              className="p-6 bg-card border-2 border-foreground/20 hover:border-primary transition-all group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="mb-4 pb-3 border-b-2 border-primary">
                <h3 className="text-xl font-serif font-bold uppercase tracking-tight">
                  {category.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-background border border-foreground/30 text-xs uppercase tracking-wide hover:bg-primary hover:text-background hover:border-primary transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 border-4 border-double border-foreground/30 bg-card text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            Continuously learning and adapting to new technologies
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
