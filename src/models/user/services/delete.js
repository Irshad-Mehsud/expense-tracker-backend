import { deleteById } from "../db/index.js";

const deletedData = (id) => {
deleteById(id);
}

export default deletedData;