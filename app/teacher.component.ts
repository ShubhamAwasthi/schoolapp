import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';




import { SchoolService, Context } from './school.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
	selector : 'my-home',
	template : `Welcome {{user | async}}<hr>
				<nav>
					<a [routerLink]="['subjects',{'id' : id }]" routerLinkActive="active" [preserveQueryParams]="true">Subjects</a>
					<a [routerLink]="['students',{'id': id }]" routerLinkActive="active" [preserveQueryParams]="true">Students</a>
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
	context : Observable<Context>;
	
	user : Observable<string>;

	id : string;

	subscriptions = [];

	constructor(private route : ActivatedRoute, private schoolService : SchoolService){}

	ngOnInit(){
		 this.context = this.route.queryParams.map(params => JSON.parse(params['context'] || '{}'))
		 let sub = this.context.subscribe(val => {
		 	this.id = ''+this.route.snapshot.params['id'];
		 	if(val.role == "teacher")
		 		this.user = this.schoolService.getTeacherInfo(val.id).map(val => val.name);
		 	if(val.role == "student")
		 		this.user = this.schoolService.getStudentInfo(val.id).map(val => val.name);
		 });
		 this.subscriptions.push(sub);
	}
	ngOnDestroy(){
		this.subscriptions.forEach(x => x.unsubscribe());
	}
}