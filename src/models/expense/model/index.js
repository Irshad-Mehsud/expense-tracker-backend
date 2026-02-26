import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Food', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Bills', 'Bills & Utilities', 'Utilities', 'Rent', 'Education', 'Travel', 'Other','Personal']
  },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, trim: true },
  receiptUrl: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;