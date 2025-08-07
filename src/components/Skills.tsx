import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import skillsData from '@/data/skills.json';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const SkillCategory = ({ title, skills, categoryIndex }: { title: string; skills: any[]; categoryIndex: number }) => (
    <div 
      className={`transition-all duration-1000 animate-fade-in-up ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ animationDelay: `${categoryIndex * 0.3}s` }}
    >
      <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6 capitalize">
        {title === 'tools' ? 'Tools & Platforms' : `${title} Development`}
      </h3>
      
      {/* Clean Badge Layout */}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, skillIndex) => (
          <Badge
            key={skill.name}
            variant="secondary"
            className={`px-4 py-2 text-sm font-medium glass-card btn-hover glow-cursor transition-all duration-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ animationDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.05)}s` }}
          >
            <span className="mr-2 text-base">{skill.icon}</span>
            {skill.name}
            <span className="ml-2 text-xs opacity-70">{skill.level}%</span>
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="skills" className="py-20 lg:py-32 bg-depth-gradient scroll-snap-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tech Stack
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Technologies I use to create powerful, scalable applications.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <SkillCategory 
              key={category}
              title={category}
              skills={skills} 
              categoryIndex={categoryIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;