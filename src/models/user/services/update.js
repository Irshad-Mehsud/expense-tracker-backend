import { updattedById } from "../db/index.js";

const updatedData = (id,data) => {
updattedById(id,data);
}

export { updatedData };