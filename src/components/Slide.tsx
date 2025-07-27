import { ReactNode } from 'react';

interface SlideProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  isActive: boolean;
  className?: string;
}

export const Slide = ({ children, title, subtitle, isActive, className = "" }: SlideProps) => {
  return (
    <div 
      className={`
        w-full h-full flex flex-col items-center justify-center p-12 
        ${isActive ? 'slide-enter' : 'hidden'} 
        ${className}
      `}
    >
      {title && (
        <h1 className="text-5xl font-bold text-center mb-6 text-primary fade-enter">
          {title}
        </h1>
      )}
      {subtitle && (
        <h2 className="text-2xl text-center mb-8 text-muted-foreground fade-enter" style={{ animationDelay: '0.1s' }}>
          {subtitle}
        </h2>
      )}
      <div className="max-w-4xl w-full fade-enter" style={{ animationDelay: '0.2s' }}>
        {children}
      </div>
    </div>
  );
};