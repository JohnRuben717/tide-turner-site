import { useEffect, useRef, useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import experienceData from '@/data/experience.json';

const Experience = () => {
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

  const formatDate = (dateString: string) => {
    if (dateString === 'present') return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const ExperienceCard = ({ experience, index }: { experience: any; index: number }) => (
    <div
      className={`glass-card p-8 rounded-2xl hover:glow-soft transition-all duration-500 wave-float ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Timeline Dot */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
            {experience.startDate.split('-')[0].slice(-2)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2">
              {experience.title}
            </h3>
            <h4 className="text-lg font-semibold text-primary mb-4">
              {experience.company}
            </h4>
          </div>

          {/* Meta Info */}
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>
                {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{experience.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {experience.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech: string) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="experience" className="py-20 lg:py-32 bg-depth-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Professional Journey
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Like tides that shape the coastline, each role has molded my expertise 
            and deepened my understanding of crafting exceptional digital experiences.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experienceData.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>

        {/* Decorative Wave Elements */}
        <div className="relative mt-20 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-32 h-1 bg-primary/20 rounded-full wave-float"></div>
            <div className="absolute top-10 right-1/3 w-24 h-1 bg-accent/20 rounded-full wave-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-20 left-1/2 w-40 h-1 bg-secondary/20 rounded-full wave-float" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;