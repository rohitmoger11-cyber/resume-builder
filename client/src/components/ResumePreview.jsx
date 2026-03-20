import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImage from "./templates/MinimalImageTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;

      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;

      case "minimal-image":
        return <MinimalImage data={data} accentColor={accentColor} />;

      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div
        id="resume-preview"
        className="w-full border border-gray-300 bg-white shadow-lg"
        style={{ maxWidth: "8.5in", minHeight: "11in" }}
      >
        {renderTemplate()}
      </div>

      <style jsx>{`
        @page {
          size: letter;
          margin: 0;
        }

        @media print {
          * {
            margin: 0;
            padding: 0;
          }

          html,
          body {
            width: 8.5in;
            height: 11in;
            margin: 0;
            padding: 0;
            background: white;
            overflow: hidden;
          }

          body * {
            visibility: hidden !important;
          }

          #resume-preview {
            visibility: visible !important;
            position: fixed;
            left: 0;
            top: 0;
            width: 8.5in;
            height: 11in;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white;
            overflow: hidden;
            page-break-after: avoid;
          }

          #resume-preview * {
            visibility: visible !important;
          }

          /* Ensure all content fits in one page */
          #resume-preview > div {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;