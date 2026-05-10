import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;

    console.log("Data received for new task:", { title, status, user: req.user });

    if (!title) {
      return res.status(400).json({ message: "please enter title of the task" });
    }

    const newTask = new Task({
      title: title,
      status: status && status !== '' ? status : 'todo',
      user: req.user 
    });

    const savedTask = await newTask.save();
    console.log("✅ Task saved successfully in DB!");
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Mongoose Save Error:", error.message); 
    res.status(500).json({ message: error.message });
  }
};
export const getAllTasks = async (req, res) => {
  try {

    const tasks = await Task.find({ user: req.user });
    
    console.log("Found Tasks Count:", tasks.length);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTasks = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// server/controllers/taskController.js

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user });

    if (!deletedTask) {
      return res.status(404).json({ message: "تسک پیدا نشد یا شما اجازه حذف آن را ندارید" });
    }

    res.status(200).json({ message: "تسک با موفقیت حذف شد" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};