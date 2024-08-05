// tests/taskManager.test.ts

import { initializeTasks, getActiveTasks, completeTask, getCompletedTasks, getAllTasks, createTask, updateTask, deleteTask } from "@/modules/taskManager";

describe('Task Manager', () => {
  beforeEach(() => {
    initializeTasks();
  });

  test('should create initial task on initialization', () => {
    const activeTasks = getActiveTasks();
    expect(activeTasks).toContainEqual(
      expect.objectContaining({ title: 'Initial Setup' })
    );
  });

  test('should not have Group 2 tasks before completing Group 1', () => {
    completeTask('Initial Setup');
    const activeTasks = getActiveTasks();
    expect(activeTasks).not.toContainEqual(
      expect.objectContaining({ title: 'Basic Git' })
    );
  });

  test('should mark task as completed', () => {
    completeTask('Basic Introduction');
    const completedTasks = getCompletedTasks();
    expect(completedTasks).toContainEqual(
      expect.objectContaining({ title: 'Basic Introduction' })
    );
  });

  test('should fetch active tasks', () => {
    completeTask('Initial Setup');
    const activeTasks = getActiveTasks();
    expect(activeTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Basic Git' }),
        expect.objectContaining({ title: 'Git Collaboration' })
      ])
    );
  });

  test('should fetch all tasks', () => {
    const allTasks = getAllTasks();
    expect(allTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Initial Setup' }),
        expect.objectContaining({ title: 'Basic Introduction' }),
        expect.objectContaining({ title: 'Basic Git' }),
        expect.objectContaining({ title: 'Git Collaboration' }),
        expect.objectContaining({ title: 'JavaScript Basics' }),
        expect.objectContaining({ title: 'JavaScript Project' }),
        expect.objectContaining({ title: 'API Introduction' }),
        expect.objectContaining({ title: 'API Consumption' }),
        expect.objectContaining({ title: 'Final Project' }),
        expect.objectContaining({ title: 'Project Presentation' })
      ])
    );
  });

  test('should fetch completed tasks', () => {
    completeTask('Basic Introduction');
    const completedTasks = getCompletedTasks();
    expect(completedTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Basic Introduction' })
      ])
    );
  });

  test('should create a new task', () => {
    createTask('New Task', 'New task description', 'Intern', 1);
    const activeTasks = getActiveTasks();
    expect(activeTasks).toContainEqual(
      expect.objectContaining({ title: 'New Task' })
    );
  });

  test('should update a task', () => {
    const taskToUpdate = getActiveTasks()[0];
    updateTask(taskToUpdate.id, { title: 'Updated Task Title' });
    const updatedTask = getAllTasks().find(task => task.id === taskToUpdate.id);
    expect(updatedTask?.title).toBe('Updated Task Title');
  });

  test('should delete a task', () => {
    const taskToDelete = getActiveTasks()[0];
    deleteTask(taskToDelete.id);
    const activeTasks = getActiveTasks();
    expect(activeTasks).not.toContainEqual(
      expect.objectContaining({ id: taskToDelete.id })
    );
  });

  test('should enforce task completion order', () => {
    // Create initial tasks
    createTask('Initial Setup', 'Set up the development environment.', 1);
    createTask('Basic Introduction', 'Complete the introductory module.', 1);
    createTask('Basic Git', 'Learn basic Git commands.', 2);
    createTask('Git Collaboration', 'Collaborate on a Git repository.', 2);
  
    // Mark Group 1 tasks as completed
    completeTask('Initial Setup');
    completeTask('Basic Introduction');
  
    // Check tasks before completing Group 1
    let activeTasks = getActiveTasks();
    console.log('Active Tasks before completing Group 1:', activeTasks);
  
    // Mark Group 1 tasks as completed
    completeTask('Initial Setup');
    completeTask('Basic Introduction');
  
    // Check tasks after completing Group 1
    activeTasks = getActiveTasks();
    console.log('Active Tasks after completing Group 1:', activeTasks);
  
    // Update a task
    updateTask('Basic Git', 'Updated Task Title', 'Learn basic Git commands.');
  
    // Check if 'Basic Git' is present in active tasks
    const updatedGitTask = activeTasks.find(task => task.title === 'Updated Task Title');
  console.log('Updated Git Task:', updatedGitTask);

  expect(activeTasks).toContainEqual(
    expect.objectContaining({ title: 'Updated Task Title' })
  );
});
  
});
