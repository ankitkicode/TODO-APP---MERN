const todoModel = require('../../model/todos');

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body,"from updatetodo se")
    const updatedTodo = await todoModel.findByIdAndUpdate(id, req.body, { new: true });
  //  console.log(updateTodo)
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateTodo;
