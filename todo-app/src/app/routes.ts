import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

const routeConfig: Routes = [
    {
        path: '',
        component: TaskListComponent,
        title: 'Task List',
    }
];

export default routeConfig;
