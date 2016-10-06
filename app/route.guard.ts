import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Injectable } from '@angular/core';



import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { AuthService, Teacher, Student } from './auth.service';
import { AngularFire } from 'angularfire2';

@Injectable()
export class RouteGuard implements CanActivate, CanActivateChild{
	constructor(private router: Router, private authService : AuthService, private af : AngularFire){}

	teacher = "teacher";
	studentPath = "student-detail";
	students : number[];
	canActivate(route: ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean | Promise<boolean>{
		//return true;

		// Start New Logic

		let context = this.authService.getContext();
		console.log('found context');
		console.log(context);
		console.log('printed context above');
		if(context.uid !== undefined){
			console.log('found uid in context');
			if(context instanceof Teacher && route.params['id'] !== undefined){
				console.log('inside students of teachers');
				console.log(context.students.filter( s => s.uid === route.params['id']));
				return context.students.filter( s => s.uid === route.params['id']).length != 0;
			}
			return true;
		}
		else{
			console.log('uid not found in context');
			return this.af.auth.first().map(val => {
				console.log(val);
				if(val === null)
					throw(new Error('Not Logged In'));
				console.log('found auth');
				console.log(val);
				return val.uid;
			}).toPromise()
			.then(uid => this.authService.setContextAndNavigate(uid, null))
			.then(()=> {
				context = this.authService.getContext();
				console.log('inside students of teachers');
				console.log(route.params['id']);
				console.log(context);
				if(context instanceof Teacher && route.params['id'] !== undefined){
				console.log('inside students of teachers');
				console.log(context.students.filter( s => s.uid === route.params['id']));
				return context.students.filter( s => s.uid === route.params['id']).length != 0;
			}
				return Promise.resolve(true);})
			.catch(err => {console.log(err);this.router.navigate(['login']); return Promise.resolve(false)});	
		}
		// End New Logic
		/*
		this.af.auth.subscribe(val => {
			if(val !== undefined)
				console.log(val);
			else 
				console.log('not in auth');
		})

		let context = this.authService.getContext();
		if(context.uid === undefined){
			console.log('not logged in');
			this.router.navigate(['/login']);
			return false;
		}
		console.log("found: ");
		console.log(context);
		return true;
		*/
	}
	canActivateChild(route: ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean | Promise<boolean>{
		return this.canActivate(route, state);
	}
}