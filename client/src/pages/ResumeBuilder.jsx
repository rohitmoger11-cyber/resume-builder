import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowLeftIcon, Briefcase, FileText, GraduationCap, Sparkles, User ,FolderIcon, ChevronLeft ,ChevronRight, Share2Icon, EyeIcon, EyeOffIcon, DownloadIcon } from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import AccentColorSelector from "../components/AccentColorSelector";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";

const ResumeBuilder = () => {

  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = () => {
    if (resumeId && resumeId !== ":resumeId") {
      const resume = dummyResumeData.find(
        (resume) => resume._id === resumeId
      );

      if (resume) {
        setResumeData(resume);
        document.title = resume.title;
      } else {
        // Try to load from localStorage
        const storedResume = localStorage.getItem(`resume_${resumeId}`);
        if (storedResume) {
          setResumeData(JSON.parse(storedResume));
        }
      }
    }
  };

  const[activeSectionIndex, setActiveSectionIndex] = useState(0);
  const[removeBackground, setRemoveBackground] = useState(false);
  const[showToast, setShowToast] = useState(false);
  const[toastMessage, setToastMessage] = useState("");

  const sections=[
    { id: "personal", name: "Personal Info" , icon:User},
    { id: "summary", name: "Summary" , icon:FileText},
    { id: "experience", name: "Experience" , icon:Briefcase},
    { id: "education", name: "Education" , icon:GraduationCap},
    {id: "projects", name: "Projects" , icon:FolderIcon},
    { id: "skills", name: "Skills" , icon:Sparkles},

  ]

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  const changeResumeVisibility= async () => {
    setResumeData({...resumeData,public:!resumeData.public})
  }
  const handleShare=()=>{
    // Use resumeId or generate a unique ID if it doesn't exist
    let shareId = resumeId;
    if (!shareId || shareId === ":resumeId") {
      shareId = `resume_${Date.now()}`;
    }
    
    // Save resume data to localStorage for sharing
    localStorage.setItem(`resume_${shareId}`, JSON.stringify(resumeData));
    
    const frontendUrl=window.location.href.split('/app/')[0];
    const resumeUrl=frontendUrl+'/view/'+shareId;
  
    if(navigator.share){
      navigator.share({url:resumeUrl,text:"My Resume",})
    }else{
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(resumeUrl);
      alert("Share URL copied to clipboard:\n" + resumeUrl);
    }
  }

const downloadResume=()=>{
  // Wait a moment to ensure content is rendered
  setTimeout(() => {
    window.print();
  }, 100);
}

const handleSaveChanges = () => {
  setToastMessage("✓ Changes saved successfully!");
  setShowToast(true);
  
  // Auto dismiss after 3 seconds
  setTimeout(() => {
    setShowToast(false);
  }, 3000);
}

  return (
    <div>
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top fade-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">

        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center justify-end gap-2">
          {resumeData.public && (
            <button onClick={handleShare} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-1 ring-blue-300 hover:ring-2 transition-all">
              <Share2Icon className="size-4"/>Share
            </button>
          )}
          <button onClick={changeResumeVisibility}className="flex items-center gap-2 p-2 px-4 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-1 ring-purple-300 hover:ring-2 transition-all">
             {resumeData.public ? <EyeIcon className="size-4"/>:<EyeOffIcon className="size-4"/>}
             {resumeData.public ? 'Public' :'Private'}
          </button>
          <button onClick={downloadResume}className="flex items-center gap-2 p-2 px-4 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-1 ring-green-300 hover:ring-2 transition-all">
            <DownloadIcon className="size-4"/>Download
          </button>
        </div>
        </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-12 gap-8">
          {/*left side - form*/}
          <div className="relative md:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* progress bar using activeSectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-500"
              style={{width:`${activeSectionIndex*100/(sections.length - 1)}%`}} />
              {/* sections nav */}
              <div className="flex justify-between items-center mt-2 border-b border-gray-300 py-1">
              <div className="flex gap-2">
                <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template: template }))} />
                <AccentColorSelector selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />

              </div>
              <div className="flex items-center">
                {activeSectionIndex > 0 && (
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.max(prevIndex - 1, 0)
                      )
                    }
                    className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </button>
                )}

                <button
                  onClick={() =>
                    setActiveSectionIndex((prevIndex) =>
                      Math.min(prevIndex + 1, sections.length - 1)
                    )
                  }
                  className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                    activeSectionIndex === sections.length - 1 && "opacity-50"
                  }`}
                  disabled={activeSectionIndex === sections.length - 1}
                >
                  Next <ChevronRight className="size-4" />
                </button>

              </div>
              </div>

              {/*Form Content*/}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm data={resumeData.personal_info} onChange={(data)=>setResumeData(prev=>({...prev,personal_info:data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData}/>
                )}
                {activeSection.id === "experience" && (
                  <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                )}
                {activeSection.id === "education" && (
                  <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                )}
                {activeSection.id === "projects" && (
                  <ProjectForm data={resumeData.projects || []} onChange={(data) => setResumeData(prev => ({ ...prev, projects: data }))} />
                )}
                {activeSection.id === "skills" && (
                  <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                )}
              </div>
              <button onClick={handleSaveChanges} className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm">
                Save Changes
              </button>
            </div>
          </div>

          {/*right side - preview*/}
          <div className='md:col-span-7 max-md:mt-6'>
            <div className="relative w-full">
              <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;