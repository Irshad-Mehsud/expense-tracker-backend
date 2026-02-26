import * as db from "../db/index.js";
import expenseValidation from "../validation/index.js";
import mongoose from "mongoose";

export const create = async (req, res) => {
  try {
    // user ID should come from the logged-in user
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: "User ID not found. Please login again.",
      });
    }

    const expenseData = { ...req.body, user: userId };
    const expense = await db.createExpense(expenseData);

    res.status(201).json({
      status: 201,
      message: "Expense created successfully",
      expense,
    });
  } catch (err) {
    console.error("Error creating expense:", err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};


export const list = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const expenses = await db.getAllExpenses(req.user.id, filter);
    res.json({ 
      status: 200,
      expenses 
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500,
      message: err.message 
    });
  }
};

export const get = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        status: 400,
        message: "Invalid expense ID" 
      });
    }

    const expense = await db.getExpenseById(req.params.id, req.user.id);
    if (!expense) {
      return res.status(404).json({ 
        status: 404,
        message: "Expense not found" 
      });
    }
    res.json({ 
      status: 200,
      expense 
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500,
      message: err.message 
    });
  }
};

export const update = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        status: 400,
        message: "Invalid expense ID" 
      });
    }

    const expense = await db.updateById(req.params.id, req.user.id, req.body);
    if (!expense) {
      return res.status(404).json({ 
        status: 404,
        message: "Expense not found" 
      });
    }
    res.json({ 
      status: 200,
      message: "Expense updated successfully", 
      expense 
    });
  } catch (err) {
    res.status(400).json({ 
      status: 400,
      message: err.message 
    });
  }
};

export const remove = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        status: 400,
        message: "Invalid expense ID" 
      });
    }

    const expense = await db.deleteById(req.params.id, req.user.id);
    if (!expense) {
      return res.status(404).json({ 
        status: 404,
        message: "Expense not found" 
      });
    }
    res.json({ 
      status: 200,
      message: "Expense deleted successfully" 
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500,
      message: err.message 
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await db.getExpenseStats(new mongoose.Types.ObjectId(req.user.id));
    res.json({ 
      status: 200,
      stats 
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500,
      message: err.message 
    });
  }
};