import { Injectable, OnInit } from '@angular/core'
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

export class Teacher{
    uid : string;
	name : string;
	subjects : string[];
	students : StudentKey[];

}

export class StudentKey{
    name : string;
    uid : string;
}

export class Student{
    uid : string;
	name : string;
	subjects : string[];
	teachers : string[];
	performance : string;
}

interface IRouteCall{
    (x : Teacher | Student, y : Router) : void;
}

@Injectable() 
export class AuthService{
    
    constructor(private af : AngularFire, private router : Router){}
    
    private context : Teacher | Student = null;


    setContextAndNavigate(uid : string, routeCall : IRouteCall): Promise<void>  {
        console.log("Inside auth service");
       return this.af.database.object('/'+uid).first().toPromise()
       .then(val => {
            console.log("got from db context " );
            console.dir(val);
            if(val.role === "teacher"){
                this.context = new Teacher();
                (<Teacher>this.context).students = val.students; 
            }
            else{
                this.context = new Student();
                (<Student>this.context).performance = val.performance;
                (<Student>this.context).teachers = val.teachers;
            }
            this.context.uid = uid;
            this.context.name = val.name;
            this.context.subjects = val.subjects;
            console.log('now I will navigate');
            console.dir(this.getContext());
            if(this.context instanceof Teacher)
                console.log("teacher");
            if(this.context instanceof Student)
                console.log("student");
            if(routeCall)
                routeCall(this.getContext(), this.router);
            return Promise.resolve();
        })
        .catch((err) =>{console.log(err); return Promise.resolve()});
    }

    getContext() : Teacher | Student {
       let context = JSON.parse(JSON.stringify(this.context || {}));// poor clone implementation
       if(this.context instanceof Teacher)
            context.__proto__ = Teacher.prototype;
        else
            context.__proto__ = Student.prototype;
       return context;
    }

    clearContext(){
        this.context = null;
    }

}