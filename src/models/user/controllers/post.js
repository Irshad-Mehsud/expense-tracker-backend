import postData from "../services/post.js";
import jwt from "jsonwebtoken";

const postController = async(req, res) => {
    try {
        const { email } = req.body;
        
        // Create user first (this handles validation and checking if user exists)
        const user = await postData(req.body);  
        
        // Generate JWT token using the created user's ID
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        
        // Send response with token to client/frontend
        res.status(201).send({ 
            status: 201, 
            data: { ...user, token }, 
            message: "User created successfully" 
        });
    } catch (error) {
        console.error("Registration Error:", error.message);
        
        // Send a proper error response instead of just 500
        const statusCode = error.message.includes("already exists") || error.message.includes("required") ? 400 : 500;
        
        res.status(statusCode).json({ 
            status: statusCode,
            message: error.message 
        });
    }   
};

export default postController;