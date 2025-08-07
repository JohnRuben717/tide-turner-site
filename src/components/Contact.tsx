import { useEffect, useRef, useState } from 'react';
import { Send, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message sent! 🌊",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:text-foreground' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Mail, href: 'mailto:hello@ocean-flow.dev', label: 'Email', color: 'hover:text-green-500' },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Let's Create Waves Together
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to dive into your next project? Send me a message in a bottle, 
            and let's make something beautiful flow together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form - Message in a Bottle */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ animationDelay: '0.2s' }}>
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
                🍶 Message in a Bottle
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Captain Nemo"
                      className="glass-card border-0"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="captain@ocean.com"
                      className="glass-card border-0"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project or just say hello! What kind of digital waves do you want to create?"
                    className="glass-card border-0 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-soft float-gentle"
                >
                  {isSubmitting ? (
                    <>Sending your bottle to sea... 🌊</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Cast Your Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ animationDelay: '0.4s' }}>
            {/* Quick Contact */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                Quick Contact
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Prefer a direct approach? Reach out through any of these channels:
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:hello@ocean-flow.dev"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    hello@ocean-flow.dev
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-lg">🌊</span>
                    Available for freelance projects
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-lg">⏰</span>
                    Usually responds within 24 hours
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                Find Me in the Digital Ocean
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 rounded-lg glass-card hover:glow-soft transition-all ${social.color} ripple-effect float-gentle`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Fun Fact */}
            <div className="glass-card p-6 rounded-2xl text-center bubble-float">
              <div className="text-4xl mb-4">🐠</div>
              <p className="text-sm text-muted-foreground italic">
                "Did you know? Just like how fish communicate through bioluminescence, 
                I believe great UIs communicate through thoughtful animations and interactions!"
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Ocean Floor */}
        <div className="relative mt-20 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-1/4 w-2 h-16 bg-accent/20 seaweed-sway"></div>
            <div className="absolute bottom-0 right-1/3 w-2 h-20 bg-primary/20 seaweed-sway" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-0 left-2/3 w-2 h-12 bg-secondary/20 seaweed-sway" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-0 right-1/4 w-2 h-18 bg-highlight/20 seaweed-sway" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;