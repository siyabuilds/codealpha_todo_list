// Use a task class for managing the tasks efficiently
class Task {
  constructor({ id, title, description = null, endDate }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.endDate = endDate;
    this.status = "incomplete";
  }
}

// Function for generating random IDs
const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

// Array to store tasks
let tasksArray = JSON.parse(localStorage.getItem("arrayOfTasks")) || [];

// Function for adding tasks
const addTask = (task) => {
  if (!(task instanceof Task)) {
    throw new Error("I only accept valid tasks matching the task class");
  }
  tasksArray.push(task);
  localStorage.setItem("arrayOfTasks", JSON.stringify(tasksArray));
};

// Marking tasks as complete
const markAsComplete = (taskId) => {
  const task = tasksArray.find((t) => t.id === taskId);
  if (task) {
    task.status = "complete";
    localStorage.setItem("arrayOfTasks", JSON.stringify(tasksArray));
  }
};

// Removing tasks
const removeTask = (taskId) => {
  tasksArray = tasksArray.filter((task) => task.id !== taskId);
  localStorage.setItem("arrayOfTasks", JSON.stringify(tasksArray));
};

// Updating task description
const updateDescription = (taskId, newDescription) => {
  const task = tasksArray.find((t) => t.id === taskId);
  if (task) {
    task.description = newDescription;
    localStorage.setItem("arrayOfTasks", JSON.stringify(tasksArray));
  }
};
