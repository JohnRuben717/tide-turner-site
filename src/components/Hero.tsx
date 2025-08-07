import { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import oceanHero from '@/assets/ocean-hero.jpg';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-depth-gradient"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${oceanHero})` }}
      >
        <div className="absolute inset-0 bg-background/60"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Bubbles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent/30 rounded-full bubble-float"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-highlight/40 rounded-full bubble-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-primary/20 rounded-full bubble-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-5 h-5 bg-secondary/30 rounded-full bubble-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-accent/25 rounded-full bubble-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Greeting */}
          <p className="text-lg md:text-xl text-muted-foreground mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Alex Ocean
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-primary mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Crafting Smooth UI Like Tides
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            Frontend developer passionate about creating serene, accessible web experiences 
            with clean code and beautiful animations that flow naturally.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-medium btn-hover btn-cta glow-cursor"
            >
              View My Work
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="glass-card px-8 py-3 font-medium btn-hover btn-secondary glow-cursor"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <Button variant="ghost" size="icon" className="glass-card btn-hover glow-cursor">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="glass-card btn-hover glow-cursor">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="glass-card btn-hover glow-cursor">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToProjects}
            className="text-muted-foreground hover:text-primary transition-colors glow-cursor"
            aria-label="Scroll to projects"
            style={{ animation: 'scroll-cue 2s ease-in-out infinite' }}
          >
            <ChevronDown className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Gradient Overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;