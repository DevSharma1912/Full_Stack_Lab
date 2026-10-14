const API_URL = "http://localhost:5000";

const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const taskList = document.getElementById("taskList");

async function loadTasks() {
  loading.textContent = "Loading...";
  errorBox.textContent = "";
  taskList.innerHTML = "";

  try {
    const response = await fetch(`${API_URL}/api/tasks`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const tasks = await response.json();

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = `${task.title} - ${task.completed ? "Completed" : "Pending"}`;
      taskList.appendChild(li);
    });
  } catch (error) {
    errorBox.textContent =
      "Unable to load tasks. Please make sure the API server is running.";
  } finally {
    loading.textContent = "";
  }
}

loadTasks();