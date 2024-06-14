const todoModel = require('../../model/todos')

const getTodo= async (req,res)=>{
try {
    const todos = await todoModel.find();
    console.log("todos", todos);
    res.send(todos)
} catch (error) {
    res.status(500).json({messege:error.messege});
}
}

module.exports = getTodo