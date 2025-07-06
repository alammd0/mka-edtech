const Category = require("../models/Category");

exports.createcategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).json({
        succuss: false,
        message: "Please provide Category name",
      });
    }

    const category = await Category.create({
      name: name,
    });

    return res.status(200).json({
      succuss: true,
      message: "Category Create Succussfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(502).json({
      succuss: false,
      message: "Category Create error",
    });
  }
};

exports.getallcategory = async (req, res) => {
  try {
    const allCategory = await Category.find({}, { name: true });

    if (!allCategory) {
      return res.status(403).json({
        success: false,
        message: "No Category Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Category here...",
      data: allCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(503).json({
      success: false,
      message: "Category Found Error",
    });
  }
};
