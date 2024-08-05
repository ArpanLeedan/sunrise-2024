import Head from "next/head";
import { useState, useEffect } from "react";
import { getActiveTasks, getCompletedTasks, createTask, completeTask, deleteTask } from '../modules/taskManager'; // Adjust path as needed
import Task from '../model/Task'; // Adjust path as needed

const styles = {
  main: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  tabs: {
    marginBottom: '1rem',
  },
  button: {
    marginRight: '0.5rem',
  },
  taskForm: {
    marginBottom: '2rem',
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '0.5rem',
    padding: '0.5rem',
  },
  textarea: {
    display: 'block',
    width: '100%',
    marginBottom: '0.5rem',
    padding: '0.5rem',
    minHeight: '100px',
  },
  taskList: {
    listStyleType: 'none',
    padding: '0',
  },
  taskItem: {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ccc',
  },
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]); // Set type to Task[]
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    persona: '',
    group: 1,
  });
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    const fetchTasks = () => {
      if (activeTab === 'active') {
        setTasks(getActiveTasks());
      } else {
        setTasks(getCompletedTasks());
      }
    };
    fetchTasks();
  }, [activeTab]);

  const handleCreateTask = () => {
    createTask(newTask.title, newTask.description, newTask.persona, newTask.group);
    setNewTask({ title: '', description: '', persona: '', group: 1 });
    setTasks(getActiveTasks()); // Refresh the task list
  };

  const handleCompleteTask = (title: string) => {
    completeTask(title);
    setTasks(getActiveTasks()); // Refresh the task list
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
    setTasks(getActiveTasks()); // Refresh the task list
  };

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Task Management Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={styles.main}>
        <h1>Task Manager</h1>

        <div style={styles.tabs}>
          <button style={styles.button} onClick={() => setActiveTab('active')}>Active Tasks</button>
          <button style={styles.button} onClick={() => setActiveTab('completed')}>Completed Tasks</button>
        </div>

        {activeTab === 'active' && (
          <div style={styles.taskForm}>
            <h2>Create New Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              style={styles.input}
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              style={styles.textarea}
            />
            <input
              type="text"
              placeholder="Persona"
              value={newTask.persona}
              onChange={(e) => setNewTask({ ...newTask, persona: e.target.value })}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Group"
              value={newTask.group}
              onChange={(e) => setNewTask({ ...newTask, group: +e.target.value })}
              style={styles.input}
            />
            <button onClick={handleCreateTask}>Create Task</button>
          </div>
        )}

        <div>
          <h2>{activeTab === 'active' ? 'Active Tasks' : 'Completed Tasks'}</h2>
          <ul style={styles.taskList}>
            {tasks.map((task) => (
              <li key={task.id} style={styles.taskItem}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Persona: {task.persona}</p>
                <p>Group: {task.group}</p>
                {activeTab === 'active' ? (
                  <>
                    <button style={styles.button} onClick={() => handleCompleteTask(task.title)}>Complete</button>
                    <button style={styles.button} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </>
                ) : (
                  <button style={styles.button} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
