import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Salary', 'Freelance', 'Investment', 'Gift', 'Business', 'Other', 'Rental']
  },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, trim: true },
  receiptUrl: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Income = mongoose.model("Income", incomeSchema);
export default Income;