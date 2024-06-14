const todoModel = require('../../model/todos')

const updateTodo= async (req,res)=>{
try {
    const {id}= req.params
    const todo = await todoModel.findByIdAndUpdate(id,req.body);
    console.log("todos", todo);
    res.send("Updated successfully", todo)
} catch (error) {
    res.status(500).json({messege:error.messege});
}
}

module.exports = updateTodo