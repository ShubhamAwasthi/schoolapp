import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { SchoolService, Context } from './school.service';

import { AngularFire } from 'angularfire2';

@Component({
	template : `<div class="center">
					<h3>Log In</h3>
					<input #email type="text"/>
					<input #password type="password"/>
					<button type="button" (click)="signUp(email.value, password.value)">SignUp</button>
					<p *ngIf="incorrectLogin">Wrong name!</p>
					<p *ngIf="logInUnderway">Attempting to log in!</p>
				<div>
				`,
	styles : [`
				.center{
					margin: auto;
					width: 400px;
					height: 400px;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					position: absolute;
				}
			`]
})
export class LoginComponent implements OnDestroy{

	constructor(private schoolService : SchoolService, private router : Router, private af : AngularFire){}

	ngOnDestroy(){
		if(this.logInSubscription)
			this.logInSubscription.unsubscribe();

	}

	incorrectLogin = false;

	logInUnderway = false;

	logInSubscription;

	signUp(email: string, password: string){
		this.af.auth.createUser({ email: email, password: password})
		.then(v => console.log(v))
		.catch(e => console.log(e));
	}

	routeToPage(value : Context){
			let navigationextras : NavigationExtras = {
				queryParams : {'context' : JSON.stringify(value)}
			};
			if(value.role === "teacher")
				this.router.navigate(["/teacher",value.id], navigationextras);
			if(value.role === "student")
				this.router.navigate(["/student-detail",value.id], navigationextras);
	}
}