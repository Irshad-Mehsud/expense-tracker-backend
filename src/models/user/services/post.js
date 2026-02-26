import { createUser } from "../db/index.js";
const postData = async(user) => {
return await createUser(user);
};

export default postData;