import Income from "../model/index.js";
import incomeValidation from "../validation/index.js";

export const createIncome = async (incomeData) => {
  const income = new Income(incomeData);
  await income.save();
  return income.populate("user", "-password");
};

export const getAllIncomes = async (userId, filter = {}) => {
  const query = { user: userId, ...filter };
  return Income.find(query).populate("user", "-password").sort({ createdAt: -1 });
};

export const getIncomeById = async (id, userId) => {
  return Income.findOne({ _id: id, user: userId }).populate("user", "-password");
};

export const updateById = async (id, userId, data) => {
  const { error } = incomeValidation(data);
  if (error) throw new Error(error.details.map(d => d.message).join(", "));

  return Income.findOneAndUpdate(
    { _id: id, user: userId }, 
    data, 
    { new: true, runValidators: true }
  ).populate("user", "-password");
};

export const deleteById = async (id, userId) => {
  return Income.findOneAndDelete({ _id: id, user: userId });
};

export const getIncomeStats = async (userId) => {
  const stats = await Income.aggregate([
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

  const totalAmount = await Income.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  return {
    categoryStats: stats,
    totalIncomes: totalAmount[0]?.total || 0
  };
};
