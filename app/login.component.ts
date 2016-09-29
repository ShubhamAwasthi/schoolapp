import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { SchoolService, Context } from './school.service';


@Component({
	template : `<div class="center">
					<h3>Log In</h3>
					<input #name type="text" (keyup.enter)="login(name.value)"/>
					<button type="button" (click)="login(name.value)">login</button>
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

	constructor(private schoolService : SchoolService, private router : Router){}

	ngOnDestroy(){
		if(this.logInSubscription)
			this.logInSubscription.unsubscribe();

	}

	incorrectLogin = false;

	logInUnderway = false;

	logInSubscription;

	login(name: string){
		this.logInUnderway = true;
		this.incorrectLogin = false;
		this.logInSubscription = this.schoolService.login(name).subscribe((value) => {
			if(value.id === -1)
				this.incorrectLogin = true;
			else{
				this.routeToPage(value);
				console.log("login passed for" + JSON.stringify(value));
			}
		}, (error) => {
			this.incorrectLogin = true;
			this.logInUnderway = false;
		}, () => {
			this.logInUnderway = false;
		});
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