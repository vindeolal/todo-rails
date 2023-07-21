import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

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
                  (toggleCompleted)="onToggleComplete(i, task.isDone)"
                  (remove)="onRemoveTask(i)">
                </app-task>
              </li>
            </ul>
    </section>
  </div>
  `,
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  newTaskName: string = '';
  newTaskDescription: string = '';

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    this.tasks = this.taskService.addTask(this.newTaskName, this.newTaskDescription);
    this.newTaskName = '';
    this.newTaskDescription = '';
  }

  onToggleComplete(taskIndex: number, isDone: boolean) {
    this.tasks = this.taskService.markComplete(taskIndex, isDone);
  }

  onRemoveTask(taskIndex: number) {
    this.tasks = this.taskService.removeTask(taskIndex);
  }

}
