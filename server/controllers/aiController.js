
import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

//controller for enhancing resume using AI
//POST:/api/ai/enhance-pro-sum

export const enhanceResumeProSummary = async (req, res) => {
    try {
        const {userContent}=req.body;

        if(!userContent){
            return res.status(400).json({message: "missing required fields"})
        }
        
        const model = ai.getGenerativeModel({ model: process.env.OPENAI_MODEL });
        
        const response = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{
                    text: userContent
                }]
            }],
            systemInstruction: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlight key skills, experiences and career objectives. Make it compelling and ATS-friendly. Only return text, no options or anything else."
        });

        const enhancedContent = response.response.text();
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

//controller for enhancing the resume's job description
//POST:/api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
    try {
        const {userContent}=req.body;

        if(!userContent){
            return res.status(400).json({message: "missing required fields"})
        }
        
        const model = ai.getGenerativeModel({ model: process.env.OPENAI_MODEL });
        
        const response = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{
                    text: userContent
                }]
            }],
            systemInstruction: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The description should be 1-2 sentences and highlighting key responsibilities and achievements. Use action verbs and quantifiable results when possible. Make it compelling and ATS-friendly. Only return text, no options or anything else."
        });

        const enhancedContent = response.response.text();
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

//controller for uploading resumes to the database
//POST:/api/ai/upload-resume

export const uploadResume = async (req, res) => {
    try {
        const {resumeText,title}=req.body;
        const userId=req.userId;

        if(!resumeText){
            return res.status(400).json({message: "missing required fields"})
        }

        const systemPrompt="You are an expert AI agent to extract data from resumes. Return only valid JSON, no additional text.";

        const userPrompt=`extract data from resume:${resumeText}
        
        Provide data in the JSON format with no additional text before or after:
        {
        "proffesional_summary": "",
        "skills": [],
        "personal_info": {
            "image": "",
            "full_name": "",
            "profession": "",
            "email": "",
            "phone": "",
            "location": "",
            "linkedin": "",
            "website": ""
        },
        "experience": [{
            "company": "",
            "position": "",
            "start_date": "",
            "end_date": "",
            "description": "",
            "is_current": false
        }],
        "project": [{
            "name": "",
            "type": "",
            "description": ""
        }],
        "education": [{
            "institution": "",
            "degree": "",
            "field": "",
            "graduation_date": "",
            "gpa": ""
        }]
        }`;
        
        const model = ai.getGenerativeModel({ model: process.env.OPENAI_MODEL });
        
        const response = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{
                    text: userPrompt
                }]
            }],
            systemInstruction: systemPrompt
        });

        const extractedData = response.response.text();
        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({userId, title, ...parsedData})

        res.status(201).json({resume: newResume})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}