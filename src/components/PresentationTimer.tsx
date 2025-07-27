import { useState, useEffect } from 'react';

interface PresentationTimerProps {
  currentSlide: number;
  totalSlides: number;
  onTimeUpdate?: (timeLeft: number, status: 'normal' | 'warning' | 'danger') => void;
}

export const PresentationTimer = ({ currentSlide, totalSlides, onTimeUpdate }: PresentationTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          const expectedTimePerSlide = 600 / totalSlides; // Total time divided by slides
          const expectedTimeRemaining = (totalSlides - currentSlide) * expectedTimePerSlide;
          
          let status: 'normal' | 'warning' | 'danger' = 'normal';
          
          if (newTime < expectedTimeRemaining * 0.5) {
            status = 'danger';
          } else if (newTime < expectedTimeRemaining * 0.8) {
            status = 'warning';
          }
          
          onTimeUpdate?.(newTime, status);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentSlide, totalSlides, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerStatus = () => {
    const expectedTimePerSlide = 600 / totalSlides;
    const expectedTimeRemaining = (totalSlides - currentSlide) * expectedTimePerSlide;
    
    if (timeLeft < expectedTimeRemaining * 0.5) return 'danger';
    if (timeLeft < expectedTimeRemaining * 0.8) return 'warning';
    return 'normal';
  };

  const timerStatus = getTimerStatus();

  return (
    <div className="flex items-center gap-4">
      <div className={`text-2xl font-mono font-bold timer-${timerStatus}`}>
        {formatTime(timeLeft)}
      </div>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:opacity-80 transition-opacity"
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={() => {
          setTimeLeft(600);
          setIsRunning(false);
        }}
        className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:opacity-80 transition-opacity"
      >
        Reset
      </button>
    </div>
  );
};