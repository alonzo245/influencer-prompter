import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ControlsProps {
  scrollAmount: number;
  scrollStep: number;
  scrollSpeed: number;
  fontSize: number;
  textColor: string;
  horizontalPadding: number;
  onScrollUp: () => void;
  onScrollDown: () => void;
  onScrollAmountChange: (amount: number) => void;
  onScrollStepChange: (step: number) => void;
  onFontSizeChange: (size: number) => void;
  onColorChange: (color: string) => void;
  onPaddingChange: (padding: number) => void;
  onScrollSpeedChange: (speed: number) => void;
}

const MIN_PADDING = 8;
const MAX_PADDING = 40;

const Controls: React.FC<ControlsProps> = ({
  scrollAmount,
  scrollStep,
  scrollSpeed,
  fontSize,
  textColor,
  horizontalPadding,
  onScrollUp,
  onScrollDown,
  onScrollAmountChange,
  onScrollStepChange,
  onFontSizeChange,
  onColorChange,
  onPaddingChange,
  onScrollSpeedChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onScrollUp}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          title="Scroll Up (↑)"
        >
          <ChevronUp size={20} />
        </button>
        <div className="flex items-center gap-2">
          <label htmlFor="scrollAmount" className="whitespace-nowrap text-sm">
            Rows:
          </label>
          <input
            type="number"
            id="scrollAmount"
            min="1"
            max="50"
            value={scrollAmount}
            onChange={(e) =>
              onScrollAmountChange(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-16 px-2 py-1 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={onScrollDown}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          title="Scroll Down (↓)"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="scrollStep" className="whitespace-nowrap text-sm">
          Scroll Step:
        </label>
        <input
          type="number"
          id="scrollStep"
          min="1"
          max="200"
          value={scrollStep}
          onChange={(e) =>
            onScrollStepChange(Math.max(1, parseInt(e.target.value) || 1))
          }
          className="w-16 px-2 py-1 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Pixels to scroll on arrow key press"
        />
        <span className="text-xs text-gray-400">px</span>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="scrollSpeed" className="whitespace-nowrap text-sm">
          Scroll Speed:
        </label>
        <input
          type="number"
          id="scrollSpeed"
          min="10"
          max="1000"
          value={scrollSpeed}
          onChange={(e) =>
            onScrollSpeedChange(Math.max(10, parseInt(e.target.value) || 300))
          }
          className="w-16 px-2 py-1 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-xs text-gray-400">ms</span>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="fontSize" className="whitespace-nowrap text-sm">
          Font Size:
        </label>
        <input
          type="number"
          id="fontSize"
          min="12"
          max="100"
          value={fontSize}
          onChange={(e) =>
            onFontSizeChange(Math.max(12, parseInt(e.target.value) || 12))
          }
          className="w-16 px-2 py-1 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="textColor" className="whitespace-nowrap text-sm">
          Text Color:
        </label>
        <input
          type="color"
          id="textColor"
          value={textColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="padding" className="whitespace-nowrap text-sm">
          Margin:
        </label>
        <input
          type="range"
          id="padding"
          min={MIN_PADDING}
          max={MAX_PADDING}
          value={horizontalPadding}
          onChange={(e) => onPaddingChange(Number(e.target.value))}
          className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          title={`Horizontal padding: ${horizontalPadding}%`}
        />
        <span className="text-xs text-gray-400 w-8">{horizontalPadding}%</span>
      </div>
    </div>
  );
};

export default Controls;
