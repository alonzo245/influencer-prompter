import React, { useEffect, useRef, useState } from "react";
import { Maximize2, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface TeleprompterProps {
  script: string;
  fontSize: number;
  textColor: string;
  horizontalPadding: number;
  scrollStep: number;
  scrollSpeed: number; // milliseconds per step
}

type TextAlignment = "left" | "center" | "right";
type TextDirection = "rtl" | "ltr";

const DIRECTION_STORAGE_KEY = "teleprompter_direction";
const ALIGNMENT_STORAGE_KEY = "teleprompter_alignment";
const SCROLL_SPEED_KEY = "teleprompter_scroll_speed";

const Teleprompter: React.FC<TeleprompterProps> = ({
  script,
  fontSize,
  textColor,
  horizontalPadding,
  scrollStep,
  scrollSpeed,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [textAlignment, setTextAlignment] = useState<TextAlignment>(() => {
    const saved = localStorage.getItem(ALIGNMENT_STORAGE_KEY);
    return (saved as TextAlignment) || "center";
  });
  const [direction, setDirection] = useState<TextDirection>(() => {
    const saved = localStorage.getItem(DIRECTION_STORAGE_KEY);
    return (saved as TextDirection) || "rtl";
  });

  // Save states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(DIRECTION_STORAGE_KEY, direction);
  }, [direction]);

  useEffect(() => {
    localStorage.setItem(ALIGNMENT_STORAGE_KEY, textAlignment);
  }, [textAlignment]);

  const smoothScroll = (amount: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const startPosition = container.scrollTop;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scrollSpeed, 1);

      container.scrollTop = startPosition + amount * progress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          smoothScroll(scrollStep);
          break;
        case "ArrowDown":
          e.preventDefault();
          smoothScroll(scrollStep);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollStep, scrollSpeed]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  return (
    <div className="relative">
      <div
        id="teleprompter-controls"
        className="absolute top-2 right-2 z-10 flex gap-2"
      >
        <div className="flex bg-gray-800 rounded-lg overflow-hidden">
          <button
            onClick={() => setTextAlignment("left")}
            className={`p-2 hover:bg-gray-700 transition-colors ${
              textAlignment === "left" ? "bg-gray-700" : ""
            }`}
            title="Align Left"
          >
            <AlignLeft size={20} />
          </button>
          <button
            onClick={() => setTextAlignment("center")}
            className={`p-2 hover:bg-gray-700 transition-colors ${
              textAlignment === "center" ? "bg-gray-700" : ""
            }`}
            title="Align Center"
          >
            <AlignCenter size={20} />
          </button>
          <button
            onClick={() => setTextAlignment("right")}
            className={`p-2 hover:bg-gray-700 transition-colors ${
              textAlignment === "right" ? "bg-gray-700" : ""
            }`}
            title="Align Right"
          >
            <AlignRight size={20} />
          </button>
        </div>
        <button
          onClick={() => setDirection(direction === "rtl" ? "ltr" : "rtl")}
          className={`p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors ${
            direction === "rtl" ? "bg-gray-700" : ""
          }`}
          title={direction === "rtl" ? "Switch to LTR" : "Switch to RTL"}
        >
          {direction.toUpperCase()}
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          <Maximize2 size={20} />
        </button>
      </div>

      <div
        ref={containerRef}
        id="teleprompter-content"
        className={`h-full overflow-y-auto bg-black ${
          isFullscreen ? "cursor-none center-line" : ""
        } scrollbar-hide no-select`}
        style={{
          padding: `8px ${horizontalPadding}% 8px ${horizontalPadding}%`,
          msOverflowStyle: "none", // Hide scrollbar in IE and Edge
          scrollbarWidth: "none", // Hide scrollbar in Firefox
          direction: direction,
        }}
      >
        {isFullscreen && (
          <div
            className="fixed top-1/2 left-0 right-0 h-[3px] bg-red-500 z-20 "
            style={{ height: "4px" }}
          ></div>
        )}
        <div className="w-full mx-auto">
          {script.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className={`leading-relaxed mb-8`}
              style={{
                fontSize: `${fontSize}px`,
                color: textColor,
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                textAlign: textAlignment,
                direction: direction,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teleprompter;
