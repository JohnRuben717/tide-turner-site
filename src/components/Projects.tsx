import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import projectsData from '@/data/projects.json';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
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

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const isExpanded = expandedProjects.has(project.id);
    
    return (
      <div
        className={`glass-card rounded-2xl hover:glow-soft transition-all duration-500 ripple-effect group overflow-hidden ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        {/* Card Header */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            {project.featured && (
              <Badge variant="secondary" className="ml-2">Featured</Badge>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            {isExpanded ? project.description : `${project.description.slice(0, 80)}...`}
          </p>

          {/* View Details Button */}
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => toggleProject(project.id)}
            className="w-full group-hover:border-primary/50 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                View Details
              </>
            )}
          </Button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-6 pb-6 border-t border-border/50 animate-fade-in-up">
            <div className="pt-6 space-y-6">
              {/* Full Description */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">About This Project</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="hover:bg-primary/20 transition-colors">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex gap-4 pt-4">
                {project.live && (
                  <Button asChild className="flex-1">
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <section ref={sectionRef} id="projects" className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              My Ocean of Work
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Dive into my collection of projects, each crafted with attention to detail 
              and flowing user experiences.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
            {projectsData
              .map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
          </div>

          {/* View All Projects */}
          <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.8s' }}>
            <Button variant="outline" size="lg" className="glass-card hover:glow-soft">
              View All Projects on GitHub
              <Github className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Floating Project Elements */}
        <div className="relative pointer-events-none overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/6 w-12 h-12 bg-primary/10 rounded-full bubble-float"></div>
            <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-accent/10 rounded-full bubble-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-10 h-10 bg-highlight/10 rounded-full bubble-float" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Projects;