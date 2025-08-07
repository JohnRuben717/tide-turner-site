import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import projectsData from '@/data/projects.json';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
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

  const ProjectCard = ({ project, index }: { project: any; index: number }) => (
    <div
      className={`glass-card p-6 rounded-2xl hover:glow-soft transition-all duration-500 ripple-effect cursor-pointer group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${project.featured ? 'md:col-span-2' : ''}`}
      style={{ animationDelay: `${index * 0.2}s` }}
      onClick={() => setSelectedProject(project)}
    >
      {/* Project Image Placeholder */}
      <div className="aspect-video bg-muted rounded-lg mb-6 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <div className="text-6xl opacity-50">{project.featured ? '🌊' : '💧'}</div>
        </div>
      </div>

      {/* Project Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <Badge variant="secondary" className="ml-2">Featured</Badge>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech: string) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          {project.github && (
            <Button size="sm" variant="ghost">
              <Github className="h-4 w-4" />
            </Button>
          )}
          {project.live && (
            <Button size="sm" variant="ghost">
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section ref={sectionRef} id="projects" className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Dive into my collection of projects, each crafted with attention to detail 
              and flowing user experiences.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
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

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg">
          <div className="glass-card max-w-2xl w-full p-8 rounded-2xl animate-scale-in">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {selectedProject.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {selectedProject.description}
              </p>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech: string) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {selectedProject.live && (
                  <Button asChild>
                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {selectedProject.github && (
                  <Button variant="outline" asChild>
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;