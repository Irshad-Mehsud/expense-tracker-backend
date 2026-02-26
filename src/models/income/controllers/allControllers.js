import * as db from "../db/index.js";
import mongoose from "mongoose";

export const create = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: "User ID not found. Please login again.",
      });
    }

    const incomeData = { ...req.body, user: userId };
    const income = await db.createIncome(incomeData);

    res.status(201).json({
      status: 201,
      message: "Income created successfully",
      income,
    });
  } catch (err) {
    console.error("Error creating income:", err);
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

    const incomes = await db.getAllIncomes(req.user.id, filter);
    res.json({ 
      status: 200,
      incomes 
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
        message: "Invalid income ID" 
      });
    }

    const income = await db.getIncomeById(req.params.id, req.user.id);
    if (!income) {
      return res.status(404).json({ 
        status: 404,
        message: "Income not found" 
      });
    }
    res.json({ 
      status: 200,
      income 
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
        message: "Invalid income ID" 
      });
    }

    const income = await db.updateById(req.params.id, req.user.id, req.body);
    if (!income) {
      return res.status(404).json({ 
        status: 404,
        message: "Income not found" 
      });
    }
    res.json({ 
      status: 200,
      message: "Income updated successfully", 
      income 
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
        message: "Invalid income ID" 
      });
    }

    const income = await db.deleteById(req.params.id, req.user.id);
    if (!income) {
      return res.status(404).json({ 
        status: 404,
        message: "Income not found" 
      });
    }
    res.json({ 
      status: 200,
      message: "Income deleted successfully" 
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
    const stats = await db.getIncomeStats(req.user.id);
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
