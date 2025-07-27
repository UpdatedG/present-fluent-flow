import { useState, useEffect } from 'react';
import { Slide } from './Slide';
import { SlideNavigation } from './SlideNavigation';
import { PresentationTimer } from './PresentationTimer';

const slides = [
  {
    id: 'welcome',
    title: 'Welcome to this web presentation',
    content: (
      <div className="text-center">
        <img 
          src="/lovable-uploads/98dbf848-be83-4630-be95-c70aed092938.png" 
          alt="HyperOps Logo" 
          className="mx-auto mb-8 max-w-md h-auto"
        />
        <p className="text-xl text-muted-foreground">
          Revolutionizing Development Operations
        </p>
      </div>
    )
  },
  {
    id: 'context',
    title: 'Context',
    content: (
      <div className="space-y-6">
        <ul className="space-y-4 text-lg">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
            <span>We have recognized the emerging trends discussed by Egidijus and tried to address the issue stemming from the fact that recent LLM developments, particularly vibe coding trend enabled big new group of people to create code (sometimes quite sophisticated), however they normally don't possess the knowledge to securely deploy and maintain it.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
            <span>If they can deploy it using built-in tools, they have very little control over where its hosted and how its managed.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
            <span>We are working on a user-friendly solution to change this.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'demo',
    title: 'Demo',
    subtitle: 'Show don\'t tell',
    content: (
      <div className="text-center">
        <div className="bg-card border rounded-lg p-12 mb-6">
          <p className="text-2xl text-muted-foreground mb-8">
            Let me illustrate how it works
          </p>
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse text-4xl text-primary">
              🚀 Demo Time
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'implications',
    title: 'Implications',
    content: (
      <div className="space-y-6">
        <ul className="space-y-4 text-lg">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
            <span>Freedom to deploy to internal infrastructure, company external servers, private or public clouds fast (depends on the environment requirements, but normally within minute).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
            <span>Full access control of who can access deployed code and full code segregation.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
            <span>Security scans.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
            <span>Automatic SSL for all projects.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></span>
            <span>Segregated into docker containers and scalable.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'security',
    title: 'Security with AI agents',
    content: (
      <div className="space-y-4 text-base">
        <p>Another field of interest we see as a lot of potential is code and infrastructure security enabled by AI agents enabled by LLM models using RAG and MCP servers.</p>
        <p>We aim to intelligently integrate those agents into the entire CI/CD pipeline to make security integral part of the entire workflow without creating additional noise and overhead.</p>
        <p>This starts with code tests, goes through environment vulnerabilities assessment and concludes in regular external pen tests combining white box and black box approaches.</p>
        <p>While there are automated tools that cover those areas one-by-one, and some of them are pretty good (shootout to Code Rabbit), the biggest gripe is significant effort required to set them up properly and maintenance overhead.</p>
        <p>Our approach is to filter and adjust raw outputs via AI agents using vector database and then validate future scans against RAG provided contexts with LLM models to incrementally reduce noise and properly evaluate before presenting it to humans.</p>
      </div>
    )
  },
  {
    id: 'pipeline',
    title: 'CI/CD pipeline information routing role',
    content: (
      <div className="space-y-4 text-base">
        <p>Finally, we see AI agents as great information routers between developers, devops and SRE's.</p>
        <p>We see a lot of potential in classifying different events within pipelines and environments and using that against internal company databases to find the best recipient for that event based on event type, criticality, company policy, user role, availability and user feedback.</p>
        <p>Again all of this is possible by supplying enough context with the system requests and given that 1M tokens is current industry standard for SoTA models we see this as real venue to explore. For locally hosted models with smaller context windows this can be solved via multiple iterations of distillation.</p>
        <p>At the end of the day we see this "traffic control" role to bring significant improvements in information flow within areas discussed.</p>
      </div>
    )
  }
];

export const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timerStatus, setTimerStatus] = useState<'normal' | 'warning' | 'danger'>('normal');

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSlideSelect = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const handleTimeUpdate = (timeLeft: number, status: 'normal' | 'warning' | 'danger') => {
    setTimerStatus(status);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <div className="min-h-screen presentation-bg">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/98dbf848-be83-4630-be95-c70aed092938.png" 
              alt="HyperOps Logo" 
              className="h-8"
            />
          </div>
          <PresentationTimer
            currentSlide={currentSlide}
            totalSlides={slides.length}
            onTimeUpdate={handleTimeUpdate}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="h-screen pt-20 pb-20">
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            title={slide.title}
            subtitle={'subtitle' in slide ? slide.subtitle : undefined}
            isActive={index === currentSlide}
          >
            {slide.content}
          </Slide>
        ))}
      </main>

      {/* Footer Navigation */}
      <footer className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex justify-center">
          <SlideNavigation
            currentSlide={currentSlide}
            totalSlides={slides.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSlideSelect={handleSlideSelect}
          />
        </div>
      </footer>

      {/* Instructions */}
      <div className="absolute bottom-4 left-6 text-sm text-muted-foreground">
        Use ← → keys or spacebar to navigate
      </div>
    </div>
  );
};