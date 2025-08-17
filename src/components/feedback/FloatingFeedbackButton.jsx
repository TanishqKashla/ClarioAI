import React from 'react';
import { ClipboardPen } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingFeedbackButton = ({ onClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 z-50 flex items-center justify-center",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      aria-label="Open feedback form"
    >
      <ClipboardPen className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
};

export default FloatingFeedbackButton;
