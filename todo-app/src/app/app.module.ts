import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule, 
    MatSnackBarModule
  ],
  providers: [
    provideRouter(routeConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
