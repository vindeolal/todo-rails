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

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this._fetchTasks();
  }

  addTask() {
    if (this.isEdit) {
      this.taskService.updateTask(this.newTask)
        .subscribe(this._taskObserver("Task updated", "Error updating task"))
    } else {
      this.taskService.addTask(this.newTask)
        .subscribe(this._taskObserver("Task created", "Error creating task"))
    }
    this.newTask = new Task('', '')
    this.isEdit = false;
  }

  onToggleComplete(task: Task) {
    task.isDone = !task.isDone;
    this.taskService.updateTask(task)
      .subscribe(this._taskObserver("Task updated", "Error updating task"))
  }

  onRemoveTask(taskId: number) {
    this.taskService.removeTask(taskId)
      .subscribe(this._taskObserver("Task deleted", "Error deleting task"))
  }

  onEditTask(task: Task) {
    this.newTask = task.clone();
    this.isEdit = true;
  }

  _fetchTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  //TODO: add snackbar here???
  _taskObserver(successMessage: string, failureMessage: string) {
    return {
      next: () => {
        console.log(`${successMessage}`)
        this._fetchTasks();
      },
      error: (error: Error) => {
        console.error(`${failureMessage} : ${error}`);
      }
    }
  }

}
