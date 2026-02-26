import { updatedData } from '../services/update.js';


const updateController =async (req, res) => {
try {
   const id = req.params.id;
    await updatedData(id, req.body);

    console.log(id);
    res.status(200).json({ status:200, message: "User updated successfully" });
} catch (error) {
    res.status(500).json({ status:500, error: error.message });
}
};

export default updateController;