import { Injectable, PipeTransform } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { MonoTypeOperatorFunction, Observable, OperatorFunction, catchError, map, retry } from 'rxjs';
import { Audit } from './audit';
import { Apollo } from 'apollo-angular';
import { GET_ALL_TASKS } from './graphql/graphql.queries';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) { }

  BASE_URL = 'http://localhost:3000';

  getTasks(): Observable<any> {
    return this.http
      .get<Task[]>(`${this.BASE_URL}/tasks`)
      .pipe(
        map((tasks) => tasks.map(this._mapTask)),
        ...this._handleTaskResponse("Failed to fetch the task. Please try again.")
      )
  }

  addTask(newTask: Task): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}/tasks`, newTask)
      .pipe(...this._handleTaskResponse("Failed to save the task. Please try again."))
  }

  updateTask(updatedTask: Task): Observable<any> {
    return this.http
      .put(`${this.BASE_URL}/tasks/${updatedTask.id}`, updatedTask)
      .pipe(...this._handleTaskResponse("Failed to update the task. Please try again."))
  }

  removeTask(taskId: number): Observable<any> {
    return this.http
      .delete(`${this.BASE_URL}/tasks/${taskId}`)
      .pipe(...this._handleTaskResponse("Failed to delete the task. Please try again."))
  }

  getAuditForTask(taskId: number) {
    return this.http
      .get<[]>(`${this.BASE_URL}/audits/Task/${taskId}`)
      .pipe(
        map((audits) => audits.map(Audit.mapAudit)),
        ...this._handleTaskResponse("Failed to get the task Details.")
      )
  }

  getTasksGQL(): Observable<any> {
    return this.apollo.query({
      query: GET_ALL_TASKS,
      fetchPolicy: "network-only"
    }).pipe(
      map(({ data }: any) => data.tasks.map(this._mapTask)),
      ...this._handleTaskResponse("Failed to fetch the task. Please try again.")
    )
  }

  _handleTaskResponse(errorMessage: string): [MonoTypeOperatorFunction<unknown>, OperatorFunction<unknown, unknown>] {
    return [
      retry(2),
      catchError(() => { throw new Error(errorMessage) })
    ]
  }

  _mapTask(obj: any): Task {
    const task = new Task(obj.name, obj.description, obj.isDone, obj.order);
    task.id = obj.id;
    return task;
  }

}
