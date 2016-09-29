import { Component, OnInit} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { SchoolService, StudentKey } from './school.service';

import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
	template :  `
				<div class="center">
					<b>Subjects</b>
					<ul>
						<li *ngFor="let student of students | async" (click)="selectId(student)" [class.selected]="isSelected(student.id)">
							<span>{{student.name}}</span>
						</li>
					</ul>
				<div>
				<button type="button" [hidden]=false (click)="goToStudent()">View Detail</button>
				`,
	styles : [`
				li.selected span{
					border : 1px solid black;
				}
			`]
})
export class TeacherStudentsComponent implements OnInit{
	students : Observable<StudentKey[]>;
	constructor(private schoolService : SchoolService, private activatedRoute : ActivatedRoute,
				 private router : Router){}

	selectedId : number = -1;

	selectId(student : StudentKey){
		this.selectedId = student.id;
	}

	isSelected(id: number){
		return this.selectedId === id;
	}

	ngOnInit(){
		this.activatedRoute.params.forEach((v : Params)=>{
			let id = +v['id'];
			this.students = this.schoolService.getStudentsByTeacher(id);
		});
	}

	goToStudent(){
		this.router.navigate(['/student-detail',this.selectedId], { preserveQueryParams : true });
	}
}
