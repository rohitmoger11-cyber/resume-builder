import { Plus, X } from "lucide-react";
import React, { useState } from "react";

const SkillsForm = ({ data, onChange }) => {
    const [input, setInput] = useState("");

    const addSkill = () => {
        if (input.trim() !== "") {
            onChange([...data, input.trim()]);
            setInput("");
        }
    };

    const removeSkill = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    Skills
                </h3>
                <p className="text-sm text-gray-500">
                    Add your technical and soft skills
                </p>
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter a skill (e.g., JavaScript, Project Management)"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={addSkill}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <Plus className="size-4" />
                    Add
                </button>
            </div>

            {data.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {data.map((skill, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                            <span>{skill}</span>
                            <button
                                onClick={() => removeSkill(index)}
                                className="text-blue-700 hover:text-blue-900 transition-colors"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                    <span className="font-semibold">Tip:</span> Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).
                </p>
            </div>
        </div>
    );
};

export default SkillsForm;
