import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  category: {
    type: String,
    required: true,
    enum: ["Savings", "Investment", "Purchase", "Travel", "Education", "Other"]
  },
  deadline: { type: Date },
  description: { type: String, trim: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;
