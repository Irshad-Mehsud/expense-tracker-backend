import Expense from "../model/index.js";
import expenseValidation from "../validation/index.js";

export const createExpense = async (expenseData) => {
  const expense = new Expense(expenseData);
  await expense.save();
  return expense.populate("user", "-password");
};

export const getAllExpenses = async (userId, filter = {}) => {
  const query = { user: userId, ...filter };
  return Expense.find(query).populate("user", "-password").sort({ createdAt: -1 });
};

export const getExpenseById = async (id, userId) => {
  return Expense.findOne({ _id: id, user: userId }).populate("user", "-password");
};

export const updateById = async (id, userId, data) => {
  const { error } = expenseValidation(data);
  if (error) throw new Error(error.details.map(d => d.message).join(", "));

  return Expense.findOneAndUpdate(
    { _id: id, user: userId }, 
    data, 
    { new: true, runValidators: true }
  ).populate("user", "-password");
};

export const deleteById = async (id, userId) => {
  return Expense.findOneAndDelete({ _id: id, user: userId });
};

export const getExpenseStats = async (userId) => {
  const stats = await Expense.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
        count: { $sum: 1 }
      }
    },
    { $sort: { total: -1 } }
  ]);

  const totalAmount = await Expense.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  return {
    categoryStats: stats,
    totalExpenses: totalAmount[0]?.total || 0
  };
};