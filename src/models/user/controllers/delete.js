import deletedData from "../services/delete.js";

const deleteController =async (req, res) => {
try {
   const id = req.params.id;
    await deletedData(id);
    res.status(200).json({ status:200, message: "User deleted successfully" });
} catch (error) {
    res.status(500).json({ status:500, error: error.message });
}
};

export default deleteController;