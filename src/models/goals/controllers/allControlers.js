import * as db from "../db/index.js";


const create = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: "User ID not found. Please login again.",
      });
    }

    const goalData = { ...req.body, user: userId };
    const goal = await db.createGoal(goalData);
    res.status(201).json({
        status: 201,
        message: "Goal created successfully",
        goal,
    });
  } catch (err) {
    console.error("Error creating goal:", err);
    res.status(400).json({
        status: 400,
        message: err.message,
    });
  }
};

const list = async (req, res) => {
    try {
        const goals = await db.getAllGoals(req.user.id);
        res.json({ 
            status: 200,
            goals 
        });
    } catch (err) {
        res.status(500).json({ 
            status: 500,
            message: err.message 
        });
    }   
};

const get = async (req, res) => {       
    try {
        const goal = await db.getGoalById(req.params.id, req.user.id);
        if (!goal) {    
            return res.status(404).json({
                status: 404,
                message: "Goal not found",
            });
        }
        res.json({
            status: 200,
            goal,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
        });
    }
};

const deleteGoal = async (req, res) => {
    try {
        const deletedGoal = await db.deleteById(req.params.id, req.user.id);
        if (!deletedGoal) {
            return res.status(404).json({
                status: 404,
                message: "Goal not found",
            });
        }   
        res.json({
            status: 200,
            message: "Goal deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: 500,    
            message: err.message,
        });
    }
};

export default {
    create,
    list,
    get,
    delete: deleteGoal,
};

