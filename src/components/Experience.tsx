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
      id={`experience-${experience.id}`}
      className={`glass-card p-8 rounded-2xl hover:glow-soft transition-all duration-500 wave-float ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      } scroll-snap-section`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="flex items-start gap-6">
        {/* Timeline Dot */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold relative">
            {experience.startDate.split('-')[0].slice(-2)}
            {/* Timeline Line */}
            {index < experienceData.length - 1 && (
              <div className="absolute top-12 left-1/2 w-0.5 h-16 bg-primary/30 transform -translate-x-1/2"></div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
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
              <Badge key={tech} variant="outline" className="text-xs btn-hover glow-cursor">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="experience" className="py-20 lg:py-32 bg-depth-gradient scroll-snap-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Professional Journey
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Each role has shaped my expertise and deepened my understanding of crafting exceptional digital experiences.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20"></div>
          
          <div className="space-y-12">
          {experienceData.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;