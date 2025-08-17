import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const FeedbackPrompt = ({ isVisible, onClose, onOpenFeedback }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-24 right-6 w-80 max-w-[calc(100vw-2rem)] rounded-xl border bg-card text-card-foreground shadow-lg z-40",
      "transform transition-all duration-500 ease-in-out",
      "sm:w-80 w-[calc(100vw-2rem)]",
      isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
    )}>
      {/* Header with close button */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b">
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          <h4 className="font-medium text-foreground font-styrene text-sm sm:text-base">Help us improve!</h4>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
          We'd love to hear your thoughts! Your feedback helps us make ClarioAI better for everyone.
        </p>
        
        <button
          onClick={onOpenFeedback}
          className={cn(
            "w-full h-9 px-3 py-1 rounded-md font-medium transition-colors duration-200 flex items-center justify-center space-x-2",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "text-sm sm:text-base"
          )}
        >
          <span className="hidden sm:inline">Share Feedback</span>
          <span className="sm:hidden">Feedback</span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackPrompt;
