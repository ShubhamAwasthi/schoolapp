import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { SchoolService, Context } from './school.service';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
	template : `<div class="center">
					<h3>Log In</h3>
					<div *ngIf="!showSignUp">
					<input #email type="text"/>
					<input #password type="password"/>
					<button type="button" (click)="login(email.value, password.value)">Login</button>
					<button type="button" (click)="showSignUpForm()">SignUp</button>
					</div>
					<p *ngIf="incorrectLogin">Wrong name!</p>
					<p *ngIf="logInUnderway">Attempting to log in!</p>
					<form *ngIf="showSignUp">
						<input #newEmail type="text"/>
						<input #newPassword type="password"/><br>
						Role:<br>
						<input type="radio" value="teacher" (click)="setRole('teacher')" />Teacher
						<input type="radio" value="student" (click)="setRole('student')" checked />Student
						<button type="button" (click)="signUp(newEmail.value, newPassword.value)">Submit</button>
					</form>
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

	showSignUp = false;

	logInSubscription;

	role = "student";

	setRole(val : string){
		this.role = val;
	}

	signUp(email: string, password: string){
		this.af.auth.createUser({ email: email, password: password})
		.then(v => {
					console.log(v);
					let t = {};
					t[v.uid] = {'role' : this.role};
					this.af.database.list('/'+this.role).push(t);
		})
		.catch(e => console.log(e));
	}

	showSignUpForm(){
		this.showSignUp = true;
	}

	login(email: string, password: string){
		this.af.auth. login({email : email, password : password}, { provider : AuthProviders.Password, method : AuthMethods.Password})
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