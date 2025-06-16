const Category = require("../models/Category") ; 

exports.createcategory = async (req, res) => {
    try{

        const { name } = req.body ; 

        if(!name) {
            return res.status(401).json({
                succuss : false,
                message : "Please provide Category name"
            })
        }

        const category = await Category.create({
            name : name
        })

        return res.status(200).json({
            succuss : true,
            message : "Category Create Succussfully"
        })

    }
    catch(error){
        console.log(error); 
        return res.status(502).json({
            succuss : false,
            message : "Category Create error"
        })
    }
}