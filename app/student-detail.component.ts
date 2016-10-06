import { Component, OnInit, OnDestroy } from '@angular/core';


import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService, Teacher, Student } from './auth.service';

import { AngularFire } from 'angularfire2';

import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/takeUntil';

@Component({
	template : `<button type="button" (click)="logOut()">Log Out</button>
				<div class="center" *ngIf="student">
					<div>
					<h3>Name</h3><br/>
					<p>{{student.name}}</p>
					</div>
					<div>
						<h3>Subjects</h3><br>
						<ul>
							<li *ngFor="let sub of student.subjects">{{sub}}</li>
						</ul>
					</div>
					<div>
						<h3>Teachers</h3><br>
						<ul>
							<li *ngFor="let tech of student.teachers">{{tech}}</li>
						</ul>
					</div>
					<div>
					<h3>Performance</h3><br>
					<p>{{student.performance}}</p>
					</div>
				</div>
				<button type="button" [hidden]="studentView" (click)="goBack()">Go back</button>
				`,
	styles : [`
				.center{
					display : flex;
					flex-wrap : wrap;
					margin : auto;
					min-width : 500px;
					height : 200px;
					left : 0;
					right : 0;
					top : 0;
					bottom : 0;
					position  : absolute;
					content-align : center;
					
				}
				div div{
					max-width : 400px;
					border: 1px solid black;
					radius : 200px;
					padding : 40px;
					content-align : center;
					margin : 10px;
					border-radius : 25px;
				}
				div p, div ul{
						text-align : right;
				}
				h3 {
					text-align : center;
				}
				ul{
					list-style-type : none;
				}
			`]

})
export class StudentDetailComponent implements OnInit{
	studentObservable;
	student : Student = null;
	studentView : boolean;
	subscription;
	goingBack = new Subject<boolean>();
	constructor(private route : ActivatedRoute, private router : Router
	 ,private af: AngularFire, private authService : AuthService){}

	ngOnInit(){
		let context = this.authService.getContext();
		console.log('Inside student-detail - context');
		console.log(context);
		console.log('Init called');
		if(context instanceof Student){
			this.studentView = true;
			console.log('db access for /' + context.uid);
			this.studentObservable = this.af.database.object('/'+context.uid);
			this.studentObservable.takeUntil(this.goingBack).subscribe( val => {
				console.log("Got Response from db");
				console.log(val);
				this.student = new Student();
				this.student.name = val.name;
				this.student.performance = val.performance;
				this.student.subjects = val.subjects;
				this.student.teachers = val.teachers;
			});
		}
		if(context instanceof Teacher){
			
			this.route.params.map(params => params['id']).first().toPromise()
			.then(id =>{
				console.log('db access for /' + id);
				this.studentObservable = this.af.database.object('/'+id);
			})
			.catch(err => {
				console.log(err);
				this.router.navigate(['login']);
			}).then(()=>{
				this.studentObservable.takeUntil(this.goingBack).subscribe( val => {
				console.log("Got Response from db");
				console.log(val);
				this.student = new Student();
				this.student.name = val.name;
				this.student.performance = val.performance;
				this.student.subjects = val.subjects;
				this.student.teachers = val.teachers;
			});
			}
			);
		}	
	    
	}
	goBack(){
		this.goingBack.next(true);
		this.router.navigate(['/teacher']);
	}

	logOut(){
		this.goingBack.next(true);
		this.authService.clearContext();
		this.af.auth.logout();
		this.router.navigate(['/login']);
	}
}