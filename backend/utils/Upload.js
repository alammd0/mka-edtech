const cloudinary = require("../config/cloudinary");

exports.UploadToCloudinary = async (folder_name, file) => {
//   console.log(file);

  const option = {
    folder: folder_name,
    resourceType: "auto",
  };

  try {
    const response = await cloudinary.uploader.upload(file.tempFilePath, option);

    console.log("Upload URL - ", response.secure_url);

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
