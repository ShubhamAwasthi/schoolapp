import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthService, Teacher, Student } from './auth.service';

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

	constructor( private router : Router, private af : AngularFire, private authSerivce : AuthService){}

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
					let t = {'role' : this.role};
					this.af.database.list("").update(v.uid, t);
		})
		.catch(e => console.log(e));
	}

	showSignUpForm(){
		this.showSignUp = true;
	}

	login(email: string, password: string){
		this.af.auth. login({email : email, password : password}, { provider : AuthProviders.Password, method : AuthMethods.Password})
		.then(v => {console.log(v);
			this.routeToPage(v.uid);	
		})
		.catch(e => console.log(e));
	}

	routeToPage(uid : string){
			console.log("Trying to get context for : "+ uid);
			this.authSerivce.setContextAndNavigate(uid, this.routeCall);
	}

	routeCall(context : Teacher|Student, router : Router){
		if(context instanceof Teacher){
			console.log("teacher")
			router.navigate(['./teacher']);
		}
		else{
			console.log("student");
			router.navigate(['./student-detail']);
		}
	}
}