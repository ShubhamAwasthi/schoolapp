import { Component, OnInit} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { SchoolService } from './school.service';

import { ActivatedRoute, Params } from '@angular/router';

@Component({
	template : `
				<div class="center">
					<b>Subjects</b>
					<ul>
						<li *ngFor="let sub of subjects | async">
							{{sub}}
						</li>
					</ul>
				<div>
				`
})
export class TeacherSubjectsComponent{
	subjects : Observable<string[]>;
	constructor(private schoolService : SchoolService, private activatedRoute : ActivatedRoute){}


	ngOnInit(){
		this.activatedRoute.params.forEach((v : Params)=>{
			let id = +v['id'];
			console.log(v);
			this.subjects = this.schoolService.getSubjectsByTeacher(id);
		});
		
	}
}