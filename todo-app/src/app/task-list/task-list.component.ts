import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  template: `
  <div class="main-container">
    <section>
      <div class="new-task-container">
          <div class="task-input">
            <input [(ngModel)]="newTaskName" type="text" placeholder="Add Task">
            <input class="desc-input" *ngIf="newTaskName" [(ngModel)]="newTaskDescription" type="text" placeholder="Add Description"/>
          </div>
          <button  class="primary" type="button" (click)="addTask()" [disabled]="!newTaskDescription">Add Task</button>
      </div>
      </section>
    <section class="main" *ngIf="tasks.length > 0">
            <ul class="todo-list">
              <li *ngFor="let task of tasks; let i = index" [class.completed]="task.isDone">
                <app-task
                  [task]="task"
                  (toggleCompleted)="onToggleTodoComplete(i, task.isDone)"
                  (remove)="onRemoveTodo(i)">
                </app-task>
              </li>
            </ul>
    </section>
  </div>
  `,
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  newTaskName: string = '';
  newTaskDescription: string = '';

  @Input()
  tasks: Task[] = [
    new Task("First Task", "First description"),
    new Task("Second Task", "Second description"),
  ];

  constructor() {
  }

  addTask() {
    this.tasks.push(new Task(this.newTaskName, this.newTaskDescription));
  }

  onToggleTodoComplete(taskIndex: number, isDone: boolean) {
    this.tasks[taskIndex].isDone = !isDone;
  }

  onRemoveTodo(taskIndex: number) {
    this.tasks.splice(taskIndex, 1)
  }

}
