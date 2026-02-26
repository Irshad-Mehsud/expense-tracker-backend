import Goal from "../model/index.js";

export async function createGoal(goalData) {
    return await Goal.create(goalData);
}

export async function getAllGoals(userId) {
    return await Goal.find({ user: userId }).sort({ createdAt: -1 });
}

export async function getGoalById(id, userId) {
    return await Goal.findOne({ _id: id, user: userId });
}

export async function deleteById(id, userId) {
    return await Goal.findOneAndDelete({ _id: id, user: userId });
}
