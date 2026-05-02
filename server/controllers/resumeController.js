import Resume from "../models/Resume.js";
import fs from 'fs';
import imagekit from "../configs/imageKit.js";
import upload from "../configs/multer.js";


//controller for creating a new resume
//POST /api/resumes/create

export const createResume = async (req, res) => {
    try {
        const userId=req.userId;
        const {title}=req.body;

        //create new resume
        const newResume=await Resume.create({userId, title})
        //return success message
        return res.status(201).json({message: "Resume created successfully", resume: newResume})
    }catch (error) {
        return res.status(400).json({message:error.message})
    }
}

//controller for deleting a resume
//DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
    try {
        const userId=req.userId;
        const {resumeId}=req.params;

        await Resume.findOneAndDelete({userId, _id: resumeId})

        //return success message
        return res.status(200).json({message: "Resume deleted successfully"})
    }catch (error) {
        return res.status(400).json({message:error.message})
    }
}

//get user resume by id
//GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        const userId=req.userId;
        const {resumeId}=req.params;

        const resume=await Resume.findOne({userId, _id: resumeId})

        if (!resume) {
            return res.status(404).json({message: "Resume not found"})
        }
         resume.__v=undefined; //hide version key in response
         resume.createdAt=undefined; //hide createdAt key in response
         resume.updatedAt=undefined; //hide updatedAt key in response


        return res.status(200).json({resume})
    }catch (error) {
        return res.status(400).json({message:error.message})
    }
}

//get resume by id public
//GET: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
    try {
        const {resumeId}=req.params;
        const resume=await Resume.findOne({_id: resumeId, public: true})

        if (!resume) {
            return res.status(404).json({message: "Resume not found"})
        }

        return res.status(200).json({resume})
    }catch (error) {
        return res.status(400).json({message:error.message})
    }   
}

//controller for updating a resume
//PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId=req.userId;
        const {resumeId}=req.params;
        let {resumeData,removeBackground}=req.body;
        const image=req.file;

        if(!resumeData){
            return res.status(400).json({message: "resumeData is required"})
        }

        // Parse resumeData if it's a string (from FormData)
        if(typeof resumeData === 'string'){
            resumeData = JSON.parse(resumeData);
        }

        let resumeDataCopy=JSON.parse(JSON.stringify(resumeData));

        if (image) {
            try {
                // Read file as buffer for ImageKit
                const fileBuffer = fs.readFileSync(image.path);
                
                // Build transformation string
                const transformationString = removeBackground 
                    ? 'w-300,h-300,fo-face,z-0.75,e-bgremove' 
                    : 'w-300,h-300,fo-face,z-0.75';
                
                try {
                    // Try to upload to ImageKit
                    const response = await imagekit.upload({   
                        file: fileBuffer,
                        fileName: image.originalname || 'resume.jpg',
                        folder: 'user-resumes',
                        overwriteFile: false,
                        transformation: {
                            pre: transformationString
                        }
                    });
                    
                    resumeDataCopy.personal_info.image = response.url;
                    console.log("Image uploaded to ImageKit:", response.url);
                } catch (kitError) {
                    // Fallback to local storage if ImageKit fails
                    console.warn("ImageKit upload failed, using local storage:", kitError.message);
                    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${image.filename}`;
                    resumeDataCopy.personal_info.image = imageUrl;
                }
                
                // Clean up temporary file
                try {
                    fs.unlinkSync(image.path);
                } catch (unlinkErr) {
                    console.error("Error deleting temporary file:", unlinkErr.message);
                }
            } catch (imageError) {
                console.error("Image handling error:", imageError);
                
                // Clean up temporary file even on error
                try {
                    fs.unlinkSync(image.path);
                } catch (unlinkErr) {
                    console.error("Error deleting temporary file:", unlinkErr.message);
                }
                
                return res.status(400).json({
                    message: "Failed to process image", 
                    error: imageError.message
                })
            }
        }
            

        const resume=await Resume.findOneAndUpdate({userId, _id: resumeId}, resumeDataCopy, {new: true})
        return res.status(200).json({message: "Resume updated successfully", resume})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
