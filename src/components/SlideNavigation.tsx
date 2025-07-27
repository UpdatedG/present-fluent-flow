import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideSelect: (slideIndex: number) => void;
}

export const SlideNavigation = ({ 
  currentSlide, 
  totalSlides, 
  onPrevious, 
  onNext, 
  onSlideSelect 
}: SlideNavigationProps) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onPrevious}
        disabled={currentSlide === 0}
        className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="flex gap-2">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => onSlideSelect(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-primary scale-125' 
                : 'bg-muted hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>
      
      <span className="text-sm text-muted-foreground font-mono">
        {currentSlide + 1} / {totalSlides}
      </span>
      
      <button
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};