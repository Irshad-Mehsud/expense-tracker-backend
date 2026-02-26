import Joi from "joi";

const incomeValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(200).required(),
    amount: Joi.number().positive().required(),
    category: Joi.string().valid('Salary', 'Freelance', 'Investments', 'Gifts', 'Business', 'Other').required(),
    date: Joi.date().iso().optional(),
    description: Joi.string().allow("", null).max(1000).optional(),
    receiptUrl: Joi.string().uri().optional(),
  });

  return schema.validate(data, { abortEarly: false });
};

export default incomeValidation;
