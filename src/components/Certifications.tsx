import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import certificationsData from '@/data/certifications.json';

const Certifications = () => {
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

  const CertificationCard = ({ cert, index }: { cert: any; index: number }) => (
    <div
      className={`glass-card p-6 rounded-2xl hover:glow-soft transition-all duration-500 ripple-effect group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Certificate Icon/Image Placeholder */}
      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 mx-auto">
        <Award className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
      </div>

      {/* Certificate Info */}
      <div className="text-center space-y-3">
        <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {cert.title}
        </h3>
        
        <div className="space-y-2">
          <Badge variant="secondary" className="font-medium">
            {cert.issuer}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {cert.date}
          </p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {cert.description}
        </p>

        {/* Verification Link */}
        {cert.verificationUrl && (
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full"
            asChild
          >
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Verify Certificate
            </a>
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="certifications" className="py-20 lg:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional certifications that validate my expertise and commitment 
            to continuous learning in the ever-evolving tech ocean.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsData.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="relative mt-16 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-6 h-6 bg-highlight/20 rounded-full float-gentle"></div>
            <div className="absolute top-10 right-1/3 w-8 h-8 bg-primary/20 rounded-full float-gentle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-accent/20 rounded-full float-gentle" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;