import { Github, Linkedin, Twitter, Heart, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-depth-gradient border-t border-border/50">
      {/* Animated Waves */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg
          className="relative block w-full h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-background/20 wave-float"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            className="fill-background/30 wave-float"
            style={{ animationDelay: '2s' }}
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-background/40 wave-float"
            style={{ animationDelay: '4s' }}
          ></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <button
              onClick={scrollToTop}
              className="font-serif text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              Ocean Flow
            </button>
            <p className="text-muted-foreground leading-relaxed">
              Crafting digital experiences that flow as naturally as ocean tides. 
              Clean code, beautiful animations, accessible design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Navigate</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const element = document.getElementById(item.id);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors text-left text-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="glass-card hover:glow-soft float-gentle"
                asChild
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-card hover:glow-soft float-gentle"
                style={{ animationDelay: '0.5s' }}
                asChild
              >
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-card hover:glow-soft float-gentle"
                style={{ animationDelay: '1s' }}
                asChild
              >
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p>📧 hello@ocean-flow.dev</p>
              <p>🌊 Available for freelance</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              © {currentYear} Ocean Flow. Made with{' '}
              <Heart className="h-4 w-4 text-red-500 animate-pulse" /> and{' '}
              <Waves className="h-4 w-4 text-primary" /> for the web.
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <button
                onClick={scrollToTop}
                className="hover:text-primary transition-colors"
              >
                Back to Surface ↑
              </button>
            </div>
          </div>
        </div>

        {/* Hidden easter egg trigger */}
        <div 
          className="absolute bottom-4 right-4 w-8 h-8 opacity-0 cursor-pointer"
          onClick={() => {
            // Easter egg: Random ocean fact modal
            alert("🐠 Fun Fact: Did you know that bioluminescent plankton create those magical glowing waves at night? Just like how good code creates magical user experiences!");
          }}
          title="Click for a surprise!"
        />
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;