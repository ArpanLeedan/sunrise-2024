import Task from '../model/Task';
import { initialTasks } from "../utils/TaskList";

// Initialize tasks with the initial tasks if empty
let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
  tasks = [...initialTasks];
  console.log('Tasks initialized:', tasks);
}

export function getActiveTasks(): Task[] {
  // Check if all tasks in Group 1 are completed
  const allGroup1TasksCompleted = tasks
    .filter(task => task.group === 1)
    .every(task => task.completed);

  console.log('All Group 1 tasks completed:', allGroup1TasksCompleted);

  // Filter active tasks based on completion and group
  const activeTasks = tasks
    .filter(task => !task.completed && (task.group === 1 || (task.group === 2 && allGroup1TasksCompleted)))
    .sort((a, b) => a.group - b.group || a.id - b.id);

  console.log('Active Tasks:', activeTasks);

  return activeTasks;
}

export function getCompletedTasks(): Task[] {
  const completedTasks = tasks.filter(task => task.completed);
  console.log('Completed Tasks:', completedTasks);
  return completedTasks;
}

export function getAllTasks(): Task[] {
  console.log('All Tasks:', tasks);
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
  console.log('Task created:', newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  }
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
  console.log(`Task with id ${taskId} deleted`);
}
