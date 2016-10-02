import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Injectable } from '@angular/core';



import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class RouteGuard implements CanActivate, CanActivateChild{
	constructor(private router: Router, private authService : AuthService){}

	teacher = "teacher";
	studentPath = "student-detail";
	students : number[];
	canActivate(route: ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean | Promise<boolean>{
		//return true;
		let context = this.authService.getContext();
		if(context.uid === undefined){
			console.log('not logged in');
			this.router.navigate(['/login']);
			return false;
		}
		console.log("found: ");
		console.log(context);
		return true;
		
	}
	canActivateChild(route: ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean | Promise<boolean>{
		return this.canActivate(route, state);
	}
}