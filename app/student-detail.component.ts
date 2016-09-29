import { Component, OnInit, OnDestroy } from '@angular/core';

import { Student, SchoolService, Context } from './school.service';

import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	template : `
				<div class="center" *ngIf="student">
					<div>
						<h3>Name</h3><br>
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
				<button type="button" [hidden]="!teacherView" (click)="goBack()">Go back</button>
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
export class StudentDetailComponent implements OnInit, OnDestroy{
	student : Student;
	teacherView : boolean;
	teacherId;
	subscription;
	constructor(private schoolService : SchoolService, private route : ActivatedRoute, private router : Router){}

	ngOnInit(){
		let id = +this.route.snapshot.params['id'];
		this.subscription = this.route.queryParams.map((params : Params) => JSON.parse(params['context']||'{}'))
		.subscribe(val => {this.teacherId = val.id; this.teacherView = (val.role === "teacher");})
		
		
		this.schoolService.getStudentInfo(id).toPromise()
			.then( res=> this.student = res);
	}
	goBack(){
		this.router.navigate(['/teacher',this.teacherId],{preserveQueryParams : true});
	}
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}