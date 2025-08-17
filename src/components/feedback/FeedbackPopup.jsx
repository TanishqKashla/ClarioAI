import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { X, Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const FeedbackPopup = ({ isOpen, onClose }) => {
  const [state, handleSubmit] = useForm("xgvzbkon");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Auto-close success popup after 3 seconds
  useEffect(() => {
    if (state.succeeded) {
      const timer = setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Add name to the form data before submitting
    const formDataWithName = new FormData(e.target);
    formDataWithName.append('name', formData.name);
    
    await handleSubmit(formDataWithName);
  };

  if (!isOpen) return null;

  if (state.succeeded) {
    return (
      <div className={cn(
        "fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] rounded-xl border bg-card text-card-foreground shadow-lg z-50",
        "transform transition-all duration-300 ease-in-out",
        "sm:w-96 w-[calc(100vw-2rem)]"
      )}>
        <div className="p-4 sm:p-6 text-center">
          <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
          <h3 className="font-semibold font-styrene text-lg sm:text-xl leading-none tracking-tight text-card-foreground mb-2">
            Thank you for your feedback!
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            We appreciate you taking the time to help us improve.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This popup will close automatically in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] rounded-xl border bg-card text-card-foreground shadow-lg z-50",
      "transform transition-all duration-300 ease-in-out",
      "sm:w-96 w-[calc(100vw-2rem)]"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b">
        <h3 className="font-semibold font-styrene text-lg sm:text-xl leading-none tracking-tight text-card-foreground">
          Send Feedback
        </h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm sm:text-base shadow-sm transition-colors",
              "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            placeholder="Your name"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm sm:text-base shadow-sm transition-colors",
              "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            placeholder="your.email@example.com"
            required
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
            className="text-destructive text-sm mt-1"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
            Feedback
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            className={cn(
              "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm sm:text-base shadow-sm transition-colors",
              "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            )}
            placeholder="Tell us about your experience, suggestions, or any issues you've encountered..."
            required
          />
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
            className="text-destructive text-sm mt-1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state.submitting}
          className={cn(
            "w-full h-10 px-3 sm:px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center space-x-2",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "text-sm sm:text-base"
          )}
        >
          {state.submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              <span className="hidden sm:inline">Sending...</span>
              <span className="sm:hidden">Sending</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send Feedback</span>
              <span className="sm:hidden">Send</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackPopup;
