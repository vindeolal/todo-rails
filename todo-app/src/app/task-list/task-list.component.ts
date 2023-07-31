import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TaskComponent } from '../task/task.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    TaskComponent,
    NgClass,
    NgFor,
    NgIf,
    FormsModule,
    MatSnackBarModule
  ],
  template: `
  <div class="main-container">
    <section>
      <div class="new-task-container">
          <div class="task-input">
            <input [(ngModel)]="newTask.name" type="text" placeholder="Add Task" required>
            <input class="desc-input" *ngIf="newTask.name" [(ngModel)]="newTask.description" type="text" placeholder="Add Description" required/>
          </div>
          <button [ngClass]="newTask.description ? 'primary' : 'secondary'" type="button" (click)="addTask()" [disabled]="!newTask.description">Add Task</button>
      </div>
      </section>
    <section class="main" *ngIf="tasks.length > 0">
      <div *ngFor="let task of tasks" class="card-container">
        <app-task
            [task]="task"
            (toggleCompleted)="onToggleComplete(task)"
            (remove)="onRemoveTask(task.id)"
            (edit)="onEditTask(task)"
            >
        </app-task>
      </div>
    </section>
  </div>
  `,
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  newTask: Task = new Task('', '');
  isEdit: boolean = false;

  constructor(
    private taskService: TaskService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._fetchTasks();
  }

  addTask() {
    if (this.isEdit) {
      this.taskService.updateTask(this.newTask)
        .subscribe(this._taskObserver("Task updated"))
    } else {
      this.taskService.addTask(this.newTask)
        .subscribe(this._taskObserver("Task created"))
    }
    this.newTask = new Task('', '')
    this.isEdit = false;
  }

  onToggleComplete(task: Task) {
    const clonedTask = task.clone();
    clonedTask.isDone = !clonedTask.isDone;
    this.taskService.updateTask(clonedTask)
      .subscribe(this._taskObserver("Task updated"))
  }

  onRemoveTask(taskId: number) {
    this.taskService.removeTask(taskId)
      .subscribe(this._taskObserver("Task deleted"))
  }

  onEditTask(task: Task) {
    this.newTask = task.clone();
    this.isEdit = true;
  }

  _fetchTasks() {
    this.taskService.getTasksGQL().subscribe(tasks => this.tasks = tasks);
  }

  _taskObserver(successMessage: string) {
    return {
      next: () => {
        this._displaySnackbar(successMessage, 'snackbar-success');
        this._fetchTasks();
      },
      error: (error: Error) => {
        this._displaySnackbar(error.message, 'snackbar-failure');
      }
    }
  }

  _displaySnackbar(message: string, className: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [className]
    });
  }

}
