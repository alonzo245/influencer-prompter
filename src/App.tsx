import React, { useState, useCallback } from "react";
import Teleprompter from "./components/Teleprompter";
import Controls from "./components/Controls";

const SCRIPT_STORAGE_KEY = "teleprompter-script";
const SCROLL_AMOUNT_STORAGE_KEY = "teleprompter-scroll-amount";
const FONT_SIZE_STORAGE_KEY = "teleprompter-font-size";
const TEXT_COLOR_STORAGE_KEY = "teleprompter-text-color";
const PADDING_STORAGE_KEY = "teleprompter-padding";
const SCROLL_STEP_STORAGE_KEY = "teleprompter-scroll-step";
const SCROLL_SPEED_STORAGE_KEY = "teleprompter-scroll-speed";

function App() {
  const [script, setScript] = useState(
    () => localStorage.getItem(SCRIPT_STORAGE_KEY) || ""
  );
  const [scrollAmount, setScrollAmount] = useState(() => {
    const saved = localStorage.getItem(SCROLL_AMOUNT_STORAGE_KEY);
    return saved ? parseInt(saved) : 5;
  });
  const [scrollStep, setScrollStep] = useState(() => {
    const saved = localStorage.getItem(SCROLL_STEP_STORAGE_KEY);
    return saved ? parseInt(saved) : 50;
  });
  const [scrollSpeed, setScrollSpeed] = useState(() => {
    const saved = localStorage.getItem(SCROLL_SPEED_STORAGE_KEY);
    return saved ? parseInt(saved) : 300;
  });
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    return saved ? parseInt(saved) : 32;
  });
  const [textColor, setTextColor] = useState(
    () => localStorage.getItem(TEXT_COLOR_STORAGE_KEY) || "#FFFFFF"
  );
  const [horizontalPadding, setHorizontalPadding] = useState(() => {
    const saved = localStorage.getItem(PADDING_STORAGE_KEY);
    return saved ? parseInt(saved) : 8;
  });

  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setScript(newValue);
    localStorage.setItem(SCRIPT_STORAGE_KEY, newValue);
  };

  const handleScrollAmountChange = (amount: number) => {
    setScrollAmount(amount);
    localStorage.setItem(SCROLL_AMOUNT_STORAGE_KEY, amount.toString());
  };

  const handleScrollStepChange = (step: number) => {
    setScrollStep(step);
    localStorage.setItem(SCROLL_STEP_STORAGE_KEY, step.toString());
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, size.toString());
  };

  const handleColorChange = (color: string) => {
    setTextColor(color);
    localStorage.setItem(TEXT_COLOR_STORAGE_KEY, color);
  };

  const handlePaddingChange = (padding: number) => {
    setHorizontalPadding(padding);
    localStorage.setItem(PADDING_STORAGE_KEY, padding.toString());
  };

  const handleScrollSpeedChange = (speed: number) => {
    setScrollSpeed(speed);
    localStorage.setItem(SCROLL_SPEED_STORAGE_KEY, speed.toString());
  };

  const smoothScroll = useCallback((amount: number) => {
    const teleprompterContent = document.getElementById("teleprompter-content");
    if (!teleprompterContent) return;

    const startPosition = teleprompterContent.scrollTop;
    const duration = 300; // milliseconds
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth acceleration and deceleration
      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      teleprompterContent.scrollTop = startPosition + amount * easeInOutCubic;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  const handleScrollUp = useCallback(() => {
    smoothScroll(-scrollAmount * 10);
  }, [scrollAmount, smoothScroll]);

  const handleScrollDown = useCallback(() => {
    smoothScroll(scrollAmount * 10);
  }, [scrollAmount, smoothScroll]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="space-y-4">
            <textarea
              value={script}
              onChange={handleScriptChange}
              className="w-full h-64 p-4 bg-gray-800 rounded-lg border border-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste or type your script here..."
            />

            <Controls
              scrollAmount={scrollAmount}
              scrollStep={scrollStep}
              scrollSpeed={scrollSpeed}
              fontSize={fontSize}
              textColor={textColor}
              horizontalPadding={horizontalPadding}
              onScrollUp={handleScrollUp}
              onScrollDown={handleScrollDown}
              onScrollAmountChange={handleScrollAmountChange}
              onScrollStepChange={handleScrollStepChange}
              onFontSizeChange={handleFontSizeChange}
              onColorChange={handleColorChange}
              onPaddingChange={handlePaddingChange}
              onScrollSpeedChange={handleScrollSpeedChange}
            />
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="relative h-[500px] overflow-hidden rounded-lg">
              <Teleprompter
                script={script}
                fontSize={fontSize}
                textColor={textColor}
                horizontalPadding={horizontalPadding}
                scrollStep={scrollStep}
                scrollSpeed={scrollSpeed}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
