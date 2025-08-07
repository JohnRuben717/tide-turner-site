import { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const timeline = [
    { phase: "The Ripples", year: "2018", description: "Started coding journey with curiosity" },
    { phase: "Building Waves", year: "2020", description: "Mastered modern frameworks and tools" },
    { phase: "Ocean Depths", year: "2022", description: "Diving deep into complex architectures" },
    { phase: "Tidal Force", year: "2024", description: "Leading teams and creating lasting impact" }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 lg:py-32 bg-background scroll-snap-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                About Me
              </h2>
              <div className="w-20 h-1 bg-primary mb-8"></div>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Like the ocean's gentle currents, I believe in creating digital experiences 
                that flow naturally and feel effortless to users. My development philosophy 
                centers around clean, accessible code and smooth interactions.
              </p>
              
              <p>
                With over 5 years of experience crafting web applications, I specialize in 
                React ecosystems, TypeScript, and modern CSS. I'm passionate about performance 
                optimization and creating maintainable codebases that scale beautifully.
              </p>

              <p>
                When I'm not coding, you'll find me exploring tide pools, practicing mindfulness, 
                or contributing to open-source projects that make the web more accessible for everyone.
              </p>
            </div>

            {/* Fun Facts */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="glass-card p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Timeline - "From Ripples to Waves" */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ animationDelay: '0.3s' }}>
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
                From Ripples to Waves
              </h3>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Timeline Line */}
                    {index < timeline.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-primary/30"></div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      {/* Timeline Dot */}
                      <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {item.year.slice(-2)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-foreground mb-1">
                          {item.phase}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;