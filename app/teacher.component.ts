import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { AuthService, Teacher } from './auth.service';


import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/takeUntil';

@Component({
	selector : 'my-home',
	template : `Welcome {{teacher?.name}}<hr>
				<button type="button" (click)="logOut()">Log Out</button>
				<nav>
					<a [routerLink]="['subjects']" routerLinkActive="active" >Subjects</a>
					<a [routerLink]="['students']" routerLinkActive="active" >students</a>
				</nav>
				<router-outlet></router-outlet>
				`,
	styles : [`
				.active{
					background-color : green;
				}
				`]
})
export class TeacherComponent implements OnInit{

	teacherObservable;
	teacher : Teacher= null;
	constructor(private route : ActivatedRoute,	private af: AngularFire, 
	private authService : AuthService, private router : Router){}
	loggingOut = new Subject<boolean>();
	ngOnInit(){
		 let context = <Teacher>this.authService.getContext();
		 console.log('found context');
		 console.log(context);
		 this.teacherObservable = this.af.database.object('/'+context.uid);
		 this.teacherObservable.takeUntil(this.loggingOut).subscribe(val => {
			 this.teacher = new Teacher();
			 console.log("Got Response from db");
			 console.log(val);
			 this.teacher.name = val.name;
			 this.teacher.students = val.students;
			 this.teacher.subjects = val.subjects;
		 });
	}
	logOut(){
		this.loggingOut.next(true);
		this.authService.clearContext();
		this.af.auth.logout();
		this.router.navigate(['/login']);
	}
}