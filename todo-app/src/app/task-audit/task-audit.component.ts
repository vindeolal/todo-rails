import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgFor, NgIf } from '@angular/common';
import { Audit } from '../audit';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-audit',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatSnackBarModule,
  ],
  template: `
    <div class="main-container">
    <section class="main" *ngIf="taskAudits.length > 0">
      <h2>Audit history</h2>
      <div *ngFor="let audit of taskAudits">
        <ul>
          <li>{{audit.displayString()}}</li>
        </ul>
      </div>
    </section>
    </div>
  `,
  styleUrls: ['./task-audit.component.css']
})
export class TaskAuditComponent implements OnInit {

  taskAudits: Audit[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._fetchAuditForTask(+params['record_id']);
    });
  }

  _fetchAuditForTask(task_id: number) {
    this.taskService.getAuditForTask(task_id).subscribe({
      next: (data: any) => {
        this.taskAudits = data
      },
      error: (error) => {
        this._snackBar.open(error.message, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-failure']
        })
      }
    })
  }
}
