import React, { useState, useRef, useEffect } from "react";
import { Layout, Check } from "lucide-react";

const TemplateSelector = ({selectedTemplate,onChange}) => {
    const[isOpen, setIsOpen] = useState(false);
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

     const templates =[
        {
            id:"classic",
            name:"Classic",
            preview:"A clean, traditional resume formate with clean section and professional typography"
        },
        {
            id:"modern",
            name:"Modern",
            preview:"A sleek, contemporary design with bold headings and a focus on visual appeal"
        },
        {
            id:"minimal-image",
            name:"Minimal Image",
            preview:"A simple, clean design that emphasizes the use of images to showcase achievements and experiences"
        },
        {
            id:"minimal",
            name:"Minimal",
            preview:"A simple, clean design with a focus on readability and ease of use"
        },
    ]

  return (
    <div className="relative" ref={containerRef}>
      <button onClick={()=> setIsOpen(!isOpen)} className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg">
        <Layout size={14}/> <span className="max-sm:hidden">Template</span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-80 max-h-96 overflow-y-auto p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-lg">
          {templates.map((template) => (
            <div key={template.id} onClick={()=>{onChange(template.id);
              setIsOpen(false)}} className={`relative p-3 border rounded-md cursor-pointer ${selectedTemplate === template.id ? "border-blue-400 bg-blue-100" : "border-gray-300 hover:bg-gray-100"}`}>
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2">
                    <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                      <Check  className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <h4 className="font-medium text-gray-800">{template.name}</h4>
                  <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">{template.preview}</div>
                  </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TemplateSelector;