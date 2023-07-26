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
            <ul class="todo-list">
              <li *ngFor="let task of tasks" [class.completed]="task.isDone">
                <app-task
                  [task]="task"
                  (toggleCompleted)="onToggleComplete(task)"
                  (remove)="onRemoveTask(task.id)">
                </app-task>
              </li>
            </ul>
    </section>
  </div>
  `,
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  newTask: Task = new Task('', '');

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this._fetchTasks();
  }

  addTask() {
    this.taskService.addTask(this.newTask)
      .subscribe(this._taskObserver("Task created", "Error creating task"))
    this.newTask = new Task('', '')
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

  _fetchTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

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
