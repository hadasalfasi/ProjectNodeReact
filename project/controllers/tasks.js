const Tasks = require('../models/tasks');

exports.addTask = async(req,res)=>{
    console.log(req.body);
    const task = await Tasks.create(req.body);
    res.json(task)
}

exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Tasks.find();
      res.json(tasks);
    } catch (error) {
      console.error('Failed to get tasks:', error);
      res.status(500).json({ message: 'Failed to get tasks' });
    }
};

exports.deleteTask = async (req, res) => {
  const  taskId  = req.params.taskId;
  console.log(taskId);
  try {
    const deletedTask = await Tasks.findOneAndDelete({ taskId: taskId });
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Failed to delete task:', error);
    res.status(500).json({ message: 'Failed to delete task'});
  }
};

exports.taskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { done } = req.body;

  try {
    const updatedTask = await Tasks.findOneAndUpdate(
      { taskId: taskId,
        done: done }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Failed to update task:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};