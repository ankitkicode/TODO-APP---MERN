const todoModel = require("../../model/todos");

const createTodo = async (req, res)=>{
    const { title, dicription , userId } = req.body;
    // Log the received data for debugging
    console.log('Received data:', {  title, dicription });
    try {
        const newTodo = new todoModel({
         title,
         dicription,
         userId
        });
        console.log('ban gya ', newTodo)
        await newTodo.save();
        res.status(201).json({message:"todo created",newTodo})
    } catch (error) {
        console.log(error);
        res.status(501).json({message:error.message})
    }
}

module.exports = createTodo;