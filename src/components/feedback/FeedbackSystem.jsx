import React, { useState, useEffect } from 'react';
import FloatingFeedbackButton from './FloatingFeedbackButton';
import FeedbackPopup from './FeedbackPopup';
import FeedbackPrompt from './FeedbackPrompt';

const FeedbackSystem = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [hasShownPrompt, setHasShownPrompt] = useState(false);

  // Show the feedback button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show occasional prompts to encourage feedback
  useEffect(() => {
    if (!hasShownPrompt && isButtonVisible) {
      const promptTimer = setTimeout(() => {
        setIsPromptVisible(true);
        setHasShownPrompt(true);
      }, 60000); // Show prompt after 60 seconds

      return () => clearTimeout(promptTimer);
    }
  }, [isButtonVisible, hasShownPrompt]);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
    // Hide prompt if it's visible
    if (isPromptVisible) {
      setIsPromptVisible(false);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleClosePrompt = () => {
    setIsPromptVisible(false);
  };

  const handleOpenFeedbackFromPrompt = () => {
    setIsPromptVisible(false);
    setIsPopupOpen(true);
  };

  return (
    <>
      <FloatingFeedbackButton 
        onClick={handleButtonClick}
        isVisible={isButtonVisible}
      />
      <FeedbackPopup 
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
      <FeedbackPrompt
        isVisible={isPromptVisible}
        onClose={handleClosePrompt}
        onOpenFeedback={handleOpenFeedbackFromPrompt}
      />
    </>
  );
};

export default FeedbackSystem;
