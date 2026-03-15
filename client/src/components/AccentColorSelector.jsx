import React, { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";

const AccentColorSelector = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const colors = [
    { id: "blue", name: "Blue", value: "#3B82F6" },
    { id: "red", name: "Red", value: "#EF4444" },
    { id: "purple", name: "Purple", value: "#A855F7" },
    { id: "green", name: "Green", value: "#10B981" },
    { id: "indigo", name: "Indigo", value: "#6366F1" },
    { id: "pink", name: "Pink", value: "#EC4899" },
    { id: "amber", name: "Amber", value: "#F59E0B" },
    { id: "slate", name: "Slate", value: "#64748B" },
  ];

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 ring-gray-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={14} /> <span className="max-sm:hidden">Accent Color</span>
      </button>
      {isOpen && (
        <div className="absolute top-full w-56 p-3 mt-2 space-y-2 z-10 bg-white rounded-md border border-gray-200 shadow-lg">
          {colors.map((color) => (
            <div
              key={color.id}
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-all ${
                selectedColor === color.value
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div
                className="size-6 rounded border border-gray-300"
                style={{ backgroundColor: color.value }}
              />
              <span className="flex-1 text-sm text-gray-700">{color.name}</span>
              {selectedColor === color.value && (
                <Check className="w-4 h-4 text-blue-600" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccentColorSelector;
