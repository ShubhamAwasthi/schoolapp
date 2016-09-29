import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { SchoolService } from './school.service';
import { routing } from './app.routing';
import { TeacherComponent } from './teacher.component';
import { TeacherSubjectsComponent } from './teacher-subjects.component';
import { TeacherStudentsComponent } from './teacher-students.component';
import { RouteGuard } from './route.guard';
import { StudentDetailComponent } from './student-detail.component';


@NgModule({
	imports : [ BrowserModule, routing ],
	declarations : [ AppComponent, LoginComponent, TeacherComponent, TeacherSubjectsComponent, TeacherStudentsComponent, StudentDetailComponent ],
	bootstrap : [ AppComponent ],
	providers : [ SchoolService, RouteGuard ]
})
export class AppModule{}