import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  template: `
  <div [ngClass]="task.isDone ? 'done-background' : 'normal-background'">
    <input class="toggle" type="checkbox" (click)="toggleTaskComplete(task)" [checked]="task.isDone">
    <label>{{task.name}}</label>
    <label> ({{task.description}})</label>
    <button class="destroy" type="button" (click)="removeTask(task)">Delete</button>
  </div>
  `,
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;

  @Output()
  remove: EventEmitter<Task> = new EventEmitter();

  @Output()
  toggleCompleted: EventEmitter<Task> = new EventEmitter();

  constructor() { }

  toggleTaskComplete(task: Task) {
    this.toggleCompleted.emit(task);
  }

  removeTask(task: Task) {
    this.remove.emit(task);
  }


}
