import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login.component';
import { TeacherComponent } from './teacher.component';
import { TeacherSubjectsComponent } from './teacher-subjects.component';
import { TeacherStudentsComponent } from './teacher-students.component';
import { StudentDetailComponent } from './student-detail.component';

import { RouteGuard } from './route.guard';

const routes : Route[] = [
	{
		path : '',
		redirectTo : 'login',
		pathMatch : 'full'
	},
	{
		path : 'login',
		component : LoginComponent/*,
		canActivate : [RouteGuard]*/
	},
	{
		path : 'teacher',
		component : TeacherComponent,
		canActivate : [RouteGuard],
		canActivateChild : [RouteGuard],
		children:[
			{
				path : 'subjects',
				component : TeacherSubjectsComponent
			},
			{
				path : 'students',
				component : TeacherStudentsComponent
			},
			{
				path : '',
				component : TeacherSubjectsComponent
			}
		]
	},
	{
		path : 'student-detail/:id',
		component : StudentDetailComponent,
		canActivate : [RouteGuard]
	},
	{
		path : 'student-detail',
		component : StudentDetailComponent,
		canActivate : [RouteGuard]
	}
];

export const routing : ModuleWithProviders = RouterModule.forRoot(routes);