import { Component, OnInit} from '@angular/core';

import { Observable } from 'rxjs/Observable';


import { ActivatedRoute, Params, Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { AuthService, StudentKey } from './auth.service';


@Component({
	template :  `
				<div class="center">
					<b>Students</b>
					<ul>
						<li *ngFor="let student of students | async" (click)="selectId(student)" [class.selected]="isSelected(student.uid)">
							<span>{{student.name}}</span>
						</li>
					</ul>
				<div>
				<button type="button" [hidden]="!selectedId" (click)="goToStudent()">View Detail</button>
				`,
	styles : [`
				li.selected span{
					border : 1px solid black;
				}
			`]
})
export class TeacherStudentsComponent implements OnInit{
	
	constructor(private activatedRoute : ActivatedRoute,
				 private router : Router, private af: AngularFire, private authService : AuthService){}

	selectedId : string = null;
	students = null;
	selectId(student : StudentKey){
		this.selectedId = student.uid;
	}

	isSelected(id: string){
		return this.selectedId === id;
	}

	ngOnInit(){
		this.students = this.af.database.object('/'+this.authService.getContext().uid+'/students'); 
	}

	goToStudent(){
		this.router.navigate(['/student-detail',this.selectedId]);
	}
}
