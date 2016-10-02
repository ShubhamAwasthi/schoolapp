import { Component, OnInit} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ActivatedRoute, Params } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { AuthService } from './auth.service';

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
	subjects;
	constructor(private activatedRoute : ActivatedRoute, 
	private af : AngularFire, private authSerivce: AuthService){}


	ngOnInit(){
		let context = this.authSerivce.getContext();
		this.subjects = this.af.database.object('/'+context.uid+'/subjects');
	}
}