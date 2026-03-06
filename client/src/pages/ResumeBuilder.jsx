import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowLeftIcon, Briefcase, FileText, GraduationCap, Sparkles, User ,FolderIcon } from "lucide-react";

const ResumeBuilder = () => {

  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personalInfo: {},
    professionalSummary: "",
    experience: [],
    education: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = () => {
    const resume = dummyResumeData.find(
      (resume) => resume._id === resumeId
    );

    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  const sections=[
    { id: "personal", name: "Personal Info" , icon:User},
    { id: "summary", name: "Summary" , icon:FileText},
    { id: "experience", name: "Experience" , icon:Briefcase},
    { id: "education", name: "Education" , icon:GraduationCap},
    {id: "projects", name: "Projects" , icon:FolderIcon},
    { id: "skills", name: "Skills" , icon:Sparkles},

  ]

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">

        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
        </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className=" grid lg:grid-cols-12 gap-8">
          {/*left side - form*/}
          <div></div>


          {/*right side - preview*/}
          <div></div>
        </div>


        </div>

    </div>
  );
};

export default ResumeBuilder;