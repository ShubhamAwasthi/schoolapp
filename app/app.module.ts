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
import { AngularFireModule } from 'angularfire2';

const fireConfig = {
	apiKey: "AIzaSyAGZIvvsY4wMJfZJIq5a3RluaWF1DDXMWo",
    authDomain: "schoolapp-17a59.firebaseapp.com",
    databaseURL: "https://schoolapp-17a59.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "1010694509122"
};

@NgModule({
	imports : [ BrowserModule, routing, AngularFireModule.initializeApp(fireConfig) ],
	declarations : [ AppComponent, LoginComponent, TeacherComponent, TeacherSubjectsComponent, TeacherStudentsComponent, StudentDetailComponent ],
	bootstrap : [ AppComponent ],
	providers : [ SchoolService, RouteGuard ]
})
export class AppModule{}