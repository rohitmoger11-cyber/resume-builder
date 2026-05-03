import { Briefcase, Plus, Sparkle, Trash2, Loader2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../configes/api";

const ExperienceForm = ({data, onChange}) => {

    const {token}=useSelector(state=>state.auth)
    const [generatingIndex,setGeneratingIndex]=useState(-1)

    const AddExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false,
        };
        onChange([...data, newExperience]);
    };

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const generateDescription = async (index) => {
        setGeneratingIndex(index)
        const experience = data[index];
        const prompt = `enhance this job description "${experience.description}" for the position of ${experience.position} at ${experience.company}`;
        try {
            const response = await api.post('/ai/enhance-job-desc',{userContent: prompt},{headers: {Authorization: token}})
            updateExperience(index, "description", response.data.enhancedContent)
            toast.success("Job description enhanced!")
        } catch (error) {
           toast.error(error.response?.data?.message || error.message) 
        }finally{
            setGeneratingIndex(-1)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        Professional Experience
                    </h3>
                    <p className="text-sm text-gray-500">
                        Add your job experience
                    </p>
                </div>
                <button 
                    onClick={AddExperience} 
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                >
                    <Plus className="size-4" />
                    Add Experience
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300"/>
                    <p>No work experience added yet.</p>
                    <p className="text-sm">Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((experience, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900">Experience #{index + 1}</h4>
                                <button 
                                    onClick={() => removeExperience(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="size-4"/>
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <input 
                                    value={experience.company || ""} 
                                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                                    type="text" 
                                    placeholder="Company Name" 
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input 
                                    value={experience.position || ""} 
                                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                                    type="text" 
                                    placeholder="Job Title" 
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                
                                <input 
                                    value={experience.start_date || ""} 
                                    onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                                    type="month"
                                    placeholder="Start Date"
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                
                                <input 
                                    value={experience.end_date || ""} 
                                    onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                                    type="month" 
                                    placeholder="End Date"
                                    disabled={experience.is_current}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    id={`current-${index}`}
                                    checked={experience.is_current || false}
                                    onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                                    className="rounded"
                                />
                                <label htmlFor={`current-${index}`} className="text-sm text-gray-700">
                                    Currently working here
                                </label>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-900">Job Description</label>
                                    <button 
                                        onClick={()=> generateDescription(index)} 
                                        disabled={generatingIndex === index || !experience.position || !experience.company}
                                        className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {generatingIndex === index ? (
                                            <Loader2 className="size-3 animate-spin" />
                                        ) : (
                                            <Sparkle className="w-3 h-3" />
                                        )}
                                        Enhance with AI
                                    </button>
                                </div>
                                <textarea 
                                    value={experience.description || ""} 
                                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                                    placeholder="Describe your key responsibilities and achievements..."
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExperienceForm;