import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_KEY = "novacart123";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Q4(a): Fetch API using fetch() inside useEffect.
  // fetch() requires response.json() to parse JSON manually.
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_URL}/api/tasks`);

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || `Request failed: ${response.status}`);
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message || "Unable to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Q4(b): Same GET request rewritten with Axios.
  // Axios automatically parses JSON and rejects non-2xx responses.
  const loadTasksWithAxios = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  // Q4(c): POST a new task with required headers and JSON body.
  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY
        },
        body: JSON.stringify({
          title: title.trim(),
          completed: false
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed: ${response.status}`);
      }

      setTasks((currentTasks) => [...currentTasks, data]);
      setTitle("");
    } catch (err) {
      setError(err.message || "Unable to create task.");
    }
  };

  // Q4(c): DELETE task and update UI without reloading.
  const deleteTask = async (id) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": API_KEY
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed: ${response.status}`);
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (err) {
      setError(err.message || "Unable to delete task.");
    }
  };

  // Q5: Explicit test for a fake ID to demonstrate readable 404 handling.
  const testNotFound = async () => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/api/tasks/9999`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed: ${response.status}`);
      }
    } catch (err) {
      setError(`404 test: ${err.message}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h2>Task Manager</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter new task"
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="actions">
        <button onClick={loadTasksWithAxios}>Reload with Axios</button>
        <button onClick={testNotFound}>Test 404</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>
              {task.title} - {task.completed ? "Completed" : "Pending"}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function App() {
  return (
    <main className="container">
      <TaskList />
    </main>
  );
}