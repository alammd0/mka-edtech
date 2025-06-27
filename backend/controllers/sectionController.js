const Section = require("../models/Section"); 
const Course = require("../models/Course");

// create Section 
exports.createSection = async (req, res) => {
    try{

        const { sectionName , courseId} = req.body ;

        if(!sectionName || !courseId){
            return res.status(502).json({
                success : false,
                message : "Field Are required"
            })
        }

        // here create section 
        const section = await Section.create({
            sectionName : sectionName
        });

        // after create update course section 
        const updateCourse = await Course.findByIdAndUpdate(courseId, {
            $push: {
                section : section.id
            }
        }, {new : true}).populate({
            path : "section",
            populate : {
                path : "subSection"
            }
        }).exec();


        return res.status(200).json({
            success : true,
            message : "Section create successfully",
            data : updateCourse
        })
    }
    catch(err){
        console.log(err);
        return res.status(502).json({
            success : false,
            message : "Create Section error please...."
        })
    }
}

// update Section 
exports.updateSection = async (req, res) => {
    try{

        const {updatedName, sectionId} = req.body ; 

        console.log("Section Name - ", updatedName);
        console.log("SectionId = ", sectionId);

        const section = await Section.findByIdAndUpdate(
            sectionId,
            {
                sectionName : updatedName
            },
            {new : true}
        )

        return res.status(200).json({
            success : true,
            message : "Section Update successfully",
            data : section
        })

    }
    catch(err){
        console.log(err);
        return res.status(502).json({
            success : false,
            message : "Update Section Error, please"
        })
    }
}

// Delete section 
exports.deleteSection = async (req, res) => {
    try{

        const { sectionId } = req.params
        console.log("Section Id -  ", sectionId);


        if(!sectionId){
            return res.status(402).json({
                success : false,
                message : "Please Provide Valid courseId"
            })
        }

        const deleteSection = await Section.findByIdAndDelete({_id : sectionId});
        console.log("Delete Section name - ", deleteSection);


        await Course.updateMany(
            {section : sectionId},
            {$pull : {section : sectionId}},
            {new : true}
        ).exec();

        return res.status(200).json({
            success : true,
            message : "Course Delete Successfully",
            deleteSection
        })

    }
    catch(err){
        console.log(err);
        return res.status(502).json({
            success : false,
            message : "Delete Section error"
        })
    }
}