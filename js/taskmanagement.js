document.getElementById("newtask-button").addEventListener("click", () => {
  Swal.fire({
    title: "Create New Task",
    html: `
      <form id="task-form">
        <label for="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          class="block border border-gray-500 focus:outline-none p-2 mb-2 focus:border-blue-600 rounded-md mx-auto"
        />

        <label for="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          class="block border border-gray-500 focus:outline-none p-2 mb-2 focus:border-blue-600 rounded-md mx-auto"
        />

        <label for="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          class="block border border-gray-500 focus:outline-none p-2 mb-2 focus:border-blue-600 rounded-md mx-auto"
        />
      </form>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Add Task",
    preConfirm: () => {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const endDate = document.getElementById("endDate").value;

      if (!title) {
        Swal.showValidationMessage("Please enter a task title");
        return false; // Prevent form submission
      }

      return { title, description, endDate };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { title, description, endDate } = result.value;

      // Check if the task already exists
      const exists = tasksArray.some(
        (task) => task.title.toLowerCase() === title.toLowerCase()
      );
      if (exists) {
        Swal.fire(
          "Task already exists!",
          "Please choose a different title.",
          "error"
        );
        return;
      }

      // Create a new Task instance
      const newTask = new Task({
        id: generateId(),
        title: title,
        description: description,
        endDate: endDate ? new Date(endDate).toISOString() : null,
      });

      // Add the new task to the tasksArray
      addTask(newTask);
      if (!newTask in tasksArray) {
        Swal.fire("Please try again", "", "error");
      }
      Swal.fire("Task Added!", "", "success");
    }
  });
});
