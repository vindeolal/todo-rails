import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  template: `
  <div>
    <mat-card>
      <mat-card-header class="card-header" [ngClass]="task.isDone ? 'done-background' : 'normal-background'">
        <mat-card-title>{{task.name}}</mat-card-title>
        <mat-card-subtitle>{{task.description}}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-actions align="end" class="no-top-padding">
      <button mat-icon-button color="primary" aria-label="toggle" (click)="toggleTaskComplete(task)" matTooltip="{{task.isDone ? 'Undo done' :'Mark done'}}">
          <mat-icon>{{task.isDone ? "undo" : "check"}}</mat-icon>
        </button>
        <button mat-icon-button color="accent" aria-label="edit" (click)="editTask(task)" matTooltip="Edit task">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button color="warn" aria-label="delete" (click)="removeTask(task)" matTooltip="Delete task">
          <mat-icon>delete</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  </div>
  `,
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;

  @Output()
  remove: EventEmitter<Task> = new EventEmitter();

  @Output()
  edit: EventEmitter<Task> = new EventEmitter();

  @Output()
  toggleCompleted: EventEmitter<Task> = new EventEmitter();

  constructor() { }

  toggleTaskComplete(task: Task) {
    this.toggleCompleted.emit(task);
  }

  removeTask(task: Task) {
    this.remove.emit(task);
  }

  editTask(task: Task) {
    this.edit.emit(task);
  }


}
