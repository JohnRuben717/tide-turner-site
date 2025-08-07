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

  const SkillBubble = ({ skill, index, categoryIndex }: { skill: any; index: number; categoryIndex: number }) => (
    <div
      className={`glass-card p-4 md:p-6 rounded-full hover:glow-soft transition-all duration-500 ripple-effect cursor-pointer group bubble-float ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ 
        animationDelay: `${(categoryIndex * 0.3) + (index * 0.1)}s`,
        animationDuration: `${6 + (index % 3)}s`
      }}
    >
      <div className="flex flex-col items-center space-y-2 min-w-[80px] md:min-w-[100px]">
        <div className="text-2xl md:text-3xl group-hover:scale-110 transition-transform float-gentle">
          {skill.icon}
        </div>
        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-center text-sm md:text-base">
          {skill.name}
        </h4>
        <div className="text-xs text-muted-foreground">
          {skill.level}%
        </div>
        
        {/* Circular Progress */}
        <div className="relative w-8 h-8 md:w-10 md:h-10">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray={`${skill.level}, 100`}
              className="transition-all duration-1000 ease-out"
              style={{
                strokeDasharray: isVisible ? `${skill.level}, 100` : '0, 100',
                transitionDelay: `${(categoryIndex * 0.3) + (index * 0.1) + 0.5}s`
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );

  const SkillCategory = ({ title, skills, categoryIndex }: { title: string; skills: any[]; categoryIndex: number }) => (
    <div 
      className={`transition-all duration-1000 animate-fade-in-up ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ animationDelay: `${categoryIndex * 0.3}s` }}
    >
      <h3 className="font-serif text-2xl font-bold text-foreground mb-8 text-center capitalize">
        {title === 'tools' ? 'Tools & Platforms' : `${title} Development`}
      </h3>
      
      {/* Floating Bubble Layout */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {skills.map((skill, skillIndex) => (
          <SkillBubble 
            key={skill.name} 
            skill={skill} 
            index={skillIndex}
            categoryIndex={categoryIndex}
          />
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

        {/* Skills Categories */}
        <div className="space-y-16">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <SkillCategory 
              key={category}
              title={category}
              skills={skills} 
              categoryIndex={categoryIndex}
            />
          ))}
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