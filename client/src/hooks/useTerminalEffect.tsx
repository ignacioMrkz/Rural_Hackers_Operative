import { useState, useEffect } from "react";

export function useTerminalEffect(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isTyping };
}

export function useGlitchEffect(text: string, interval: number = 3000) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchTimer = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, interval);

    return () => clearInterval(glitchTimer);
  }, [interval]);

  return { isGlitching };
}
