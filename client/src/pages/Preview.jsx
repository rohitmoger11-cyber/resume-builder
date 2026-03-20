import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import Loader from "../components/Loader";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeft } from "lucide-react";

const Preview = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Simulate a small delay for better UX
    const timer = setTimeout(() => {
      console.log("Resume ID:", resumeId);
      console.log("Available resumes:", dummyResumeData);
      
      // Try to find in dummyResumeData
      let resume = dummyResumeData.find((r) => r._id === resumeId);
      
      // If not found, try to get from localStorage (for newly created resumes)
      if (!resume) {
        const storedResume = localStorage.getItem(`resume_${resumeId}`);
        if (storedResume) {
          resume = JSON.parse(storedResume);
        }
      }
      
      if (resume && resume.public) {
        setResumeData(resume);
        document.title = `${resume.title} - Resume Builder`;
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [resumeId]);

  if (loading) {
    return <Loader />;
  }

  if (notFound) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-400 mb-6">Resume not found</h1>
          <p className="text-gray-600 mb-8">The resume may not exist or is private.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-all"
          >
            <ArrowLeft className="size-5" />
            go to home page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 mb-6 transition-all"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
        {resumeData && (
          <ResumePreview 
            data={resumeData} 
            template={resumeData.template || "classic"} 
            accentColor={resumeData.accent_color || "#3B82F6"}
          />
        )}
      </div>
    </div>
  );
};

export default Preview;