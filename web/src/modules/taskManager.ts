import Task from '../model/Task';
import { initialTasks } from "../utils/TaskList";

// Initialize tasks with the initial tasks if empty
let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
  tasks = [...initialTasks];
}

export function getActiveTasks(): Task[] {
  // Determine if all tasks in group 1 are completed
  const allGroup1TasksCompleted = tasks
    .filter(task => task.group === 1)
    .every(task => task.completed);

  console.log('All Group 1 tasks completed:', allGroup1TasksCompleted); // Log this value

  // Ensure tasks are returned in a specific order if required
  const activeTasks = tasks
    .filter(task => !task.completed && (task.group === 1 || (task.group === 2 && allGroup1TasksCompleted)))
    .sort((a, b) => a.group - b.group || a.id - b.id);

  console.log('Active Tasks:', activeTasks); // Log active tasks

  return activeTasks;
}


export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskTitle: string): void {
  const task = tasks.find(task => task.title === taskTitle);
  if (task) {
    task.completed = true;
  }
}
export function createTask(title: string, description: string, persona: string, group: number): void {
  const newTaskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

  const newTask = new Task(newTaskId, title, description, persona, group);
  tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    Object.assign(task, updatedTask);
  }
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}
