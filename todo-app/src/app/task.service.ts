import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [
    new Task("First Task", "First description"),
    new Task("Second Task", "Second description"),
  ];

  constructor() { }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(name: string, description: string): Task[] {
    this.tasks.push(new Task(name, description));
    return this.tasks;
  }

  markComplete(taskIndex: number, isDone: boolean): Task[] {
    this.tasks[taskIndex].isDone = !isDone;
    return this.tasks;
  }

  removeTask(taskIndex: number): Task[] {
    this.tasks.splice(taskIndex, 1)
    return this.tasks;
  }
}
