import { useEffect, useRef, useState } from 'react';
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

  const SkillBubble = ({ skill, index }: { skill: any; index: number }) => (
    <div
      className={`glass-card p-6 rounded-2xl hover:glow-soft transition-all duration-500 ripple-effect cursor-pointer group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        animation: isVisible ? 'bubble-float 8s ease-in-out infinite' : 'none',
        animationDelay: `${index * 0.5}s`
      }}
    >
      <div className="text-center">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
          {skill.icon}
        </div>
        <h3 className="font-semibold text-foreground mb-2">
          {skill.name}
        </h3>
        
        {/* Skill Level Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: isVisible ? `${skill.level}%` : '0%',
              transitionDelay: `${index * 0.1 + 0.5}s`
            }}
          ></div>
        </div>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
    </div>
  );

  const SkillCategory = ({ title, skills, delay }: { title: string; skills: any[]; delay: number }) => (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: `${delay}s` }}>
      <h3 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <SkillBubble key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="skills" className="py-20 lg:py-32 bg-depth-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tech Stack
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Like ocean currents that power marine ecosystems, these technologies flow together 
            to create powerful, scalable applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="space-y-16">
          <SkillCategory 
            title="Frontend Development" 
            skills={skillsData.frontend} 
            delay={0.2}
          />
          
          <SkillCategory 
            title="Backend & Database" 
            skills={skillsData.backend} 
            delay={0.4}
          />
          
          <SkillCategory 
            title="Tools & Platforms" 
            skills={skillsData.tools} 
            delay={0.6}
          />
        </div>

        {/* Floating Decorative Elements */}
        <div className="relative mt-20 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating tech bubbles */}
            <div className="absolute top-10 left-1/4 w-8 h-8 bg-accent/20 rounded-full float-gentle"></div>
            <div className="absolute top-20 right-1/3 w-6 h-6 bg-primary/20 rounded-full float-gentle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-10 left-1/2 w-10 h-10 bg-highlight/20 rounded-full float-gentle" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-7 h-7 bg-secondary/20 rounded-full float-gentle" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;