import { getAllData, getUserById } from "../db/index.js";
const getData = async () => {
    const users = await getAllData();
    return users;
};

const getDataById = async (userId) => {
  const userData = await getUserById(userId);
  return userData;
}
export {
    getData,
    getDataById
}