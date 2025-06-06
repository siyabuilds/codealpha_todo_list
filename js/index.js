// Initialize AOS
AOS.init();

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
  render();
};

// Marking tasks as complete
const markAsComplete = (taskId) => {
  const task = tasksArray.find((t) => t.id === taskId);
  if (task) {
    task.status = "complete";
    localStorage.setItem("arrayOfTasks", JSON.stringify(tasksArray));
    render();
  }
};

// Removing tasks
const removeTask = (taskId) => {
  tasksArray = tasksArray.filter((task) => task.id !== taskId);
  localStorage.setItem("arrayOfTasks", JSON.stringify(tasksArray));
  render();
};

// Updating task description
const updateDescription = (taskId, newDescription) => {
  const task = tasksArray.find((t) => t.id === taskId);
  if (task) {
    task.description = newDescription;
    localStorage.setItem("arrayOfTasks", JSON.stringify(tasksArray));
  }
};

// Rendering the tasks
const render = () => {
  const tasksContainer = document.getElementById("tasks");
  tasksContainer.innerHTML = "";
  if (tasksArray.length === 0) {
    tasksContainer.innerHTML = `<p class="text-center text-gray-500">No tasks available. Add some tasks!</p>`;
    return;
  }
  tasksArray.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className =
      "task border p-4 mb-2 rounded-md bg-white shadow mr-2 ml-2 border-gray-500 hover:shadow-lg hover:border-blue-300 transition-all duration-400";
    taskDiv.setAttribute("data-aos-anchor-placement", "bottom-bottom");
    taskDiv.setAttribute("data-aos", "fade-up");
    taskDiv.innerHTML = `
      <h3 class="font-bold text-lg">${task.title}</h3>
      <p>${task.description ? task.description : "No description provided."}</p>
      <p class="text-gray-600">Due: ${
        task.endDate
          ? new Date(task.endDate).toLocaleDateString()
          : "No due date"
      }</p>
      <p class="text-sm text-gray-500">Status: ${task.status}</p>
      <button class="bg-blue-500 text-white rounded-md p-1 mt-2 hover:bg-blue-300 transition-all duration-300" onclick="markAsComplete('${
        task.id
      }')">Mark as Complete</button>
      <button class="bg-red-500 text-white rounded-md p-1 mt-2 ml-2 hover:bg-red-300 transition-all duration-300" onclick="removeTask('${
        task.id
      }')">Remove Task</button>
    `;
    tasksContainer.appendChild(taskDiv);
  });
};

// Initialize the app
render();
