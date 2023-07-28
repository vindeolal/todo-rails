import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskAuditComponent } from './task-audit/task-audit.component';

const routeConfig: Routes = [
    {
        path: '',
        component: TaskListComponent,
        title: 'Task List',
    },
    {
        path: 'audits/:entity_name/:record_id',
        component: TaskAuditComponent,
        title: 'Task History',
    }
];

export default routeConfig;
