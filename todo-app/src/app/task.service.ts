import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, pipe, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'http://localhost:3000';

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.BASE_URL}/tasks`)
      .pipe(
        map((tasks) => {
          const sortedTasks = tasks.sort((a, b) => a.id - b.id)
          return sortedTasks.map(this._mapTask)
        }),
        retry(2),
        catchError(() => of([]))
      )
  }

  addTask(newTask: Task): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}/tasks`, newTask)
      .pipe(
        retry(2),
        catchError(() => {
          throw new Error("Failed to save the task. Please try again.")
        })
      )
  }

  updateTask(updatedTask: Task): Observable<any> {
    return this.http
      .put(`${this.BASE_URL}/tasks/${updatedTask.id}`, updatedTask)
      .pipe(
        retry(2),
        catchError(() => {
          throw new Error("Failed to update the task. Please try again.")
        })
      )
  }

  removeTask(taskId: number): Observable<any> {
    return this.http
      .delete(`${this.BASE_URL}/tasks/${taskId}`)
      .pipe(
        retry(2),
        catchError(() => {
          throw new Error("Failed to delete the task. Please try again.")
        })
      )
  }

  _handleTaskResponse(errorMessage: string) {
    return pipe(
      retry(2),
      catchError(() => {
        throw new Error(errorMessage)
      })
    )
  }

  _mapTask(obj: any): Task {
    const task = new Task(obj.name, obj.description, obj.isDone, obj.order);
    task.id = obj.id;
    return task;
  }
}
