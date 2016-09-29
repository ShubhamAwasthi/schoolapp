import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { SchoolService } from './school.service';


import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class RouteGuard implements CanActivate, CanActivateChild{
	constructor(private router: Router, private schoolService : SchoolService){}

	teacher = "teacher";
	studentPath = "student-detail";
	students : number[];
	canActivate(route: ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean | Promise<boolean>{
		let context = JSON.parse(route.queryParams['context'] || '{}');
		if(route.url.length == 0) return true;
		console.log(route.url[0].path);
		if(route.url[0].path === this.teacher){
			if(+context.id !== +(route.url[1].path)){
				console.log("Trying to access id " + route.url[1].path + " but id in context " + context.id);
				return false;
			}
			if(context.role !== this.teacher){
				console.log("Trying to access id " + route.url[1].path + " but role is " + context.role + " needed teacher role");
				return false;
			}
			return true;
		}
		else if(route.url[0]["path"] === this.studentPath){
			if(+context.id !== +(route.url[1].path) && context.role != this.teacher){
				console.log("Trying to access id " + route.url[1].path + " but id in context " + context.id);
				return false;
			}
			if(context.role === this.teacher){

				return this.schoolService.getTeacherInfo(+context.id).toPromise()
					.then(res => this.students = res.students)
					.then(()=> {let s = (this.students.find(t => t === +(route.url[1].path)) !== undefined);
							if(!s)
								console.log("Trying to access id " + route.url[1].path + " but this is not student of " + context.id);
						return s;});
			}
		}
		return true;
	}
	canActivateChild(route: ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean | Promise<boolean>{
		return this.canActivate(route, state);
	}
}