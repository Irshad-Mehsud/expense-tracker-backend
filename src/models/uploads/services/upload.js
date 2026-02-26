import upLoadToCloudinary from "../middleware/cloudinary.js";
const uploadFile = async(fileObj) => {
return await upLoadToCloudinary(fileObj.path, fileObj.mimetype);
};

export default uploadFile;