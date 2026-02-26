import Joi from "joi";

const expenseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(200).required(),
    amount: Joi.number().positive().required(),
    category: Joi.string().valid('Food', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Bills', 'Bills & Utilities', 'Utilities', 'Rent', 'Education', 'Travel', 'Other').required(),
    date: Joi.date().iso().optional(),
    description: Joi.string().allow("", null).max(1000).optional(),
    receiptUrl: Joi.string().uri().optional(),
  });

  return schema.validate(data, { abortEarly: false });
};

export default expenseValidation;