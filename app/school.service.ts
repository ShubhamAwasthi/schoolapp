import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

export interface Teacher{
	id : number;
	name : string;
	subjects : string[];
	students : number[];
}

export interface Student{
	id : number;
	name : string;
	subjects : string[];
	teachers : string[];
	performance : string;
}

export interface Context{
	id : number;
	role : string;
}

export interface StudentKey{
	id : number;
	name : string;
}

const teachers : Teacher[] = [
	{ id: 1, name: "Takayama", subjects: [ "Physics", "Maths" ], students: [ 1, 2 ] },
	{ id: 2, name: "James", subjects: [ "English" ], students: [ 1, 2, 3, 4 ] },
	{ id: 3, name: "Mary", subjects: [ "History", "English" ], students: [ 3, 4 ] },
	{ id: 4, name: "Kendo", subjects: [ "Astronomy", "Maths" ], students: [ 5, 6 ] },
	{ id: 5, name: "Nami", subjects: [ "Chemistry" ], students: [ 7, 8, 9, 10 ] }
];

const students : Student[] = [
	{ id: 1, name: "Meso", subjects: [ "Physics", "English" ], teachers: [ "Takayama", "James" ], performance: "A" },
	{ id: 2, name: "Prem", subjects: [ "Physics", "English" ], teachers: [ "Takayama", "James" ], performance: "B" },
	{ id: 3, name: "Edna", subjects: [ "History", "English" ], teachers: [ "Mary", "James" ], performance: "B+" },
	{ id: 4, name: "Kappa", subjects: [ "History", "English" ], teachers: [ "Mary", "James" ], performance: "A" },
	{ id: 5, name: "Domino", subjects: [ "Astronomy" ], teachers: [ "Kendo" ], performance: "A-" },
	{ id: 6, name: "Tony", subjects: [ "Maths" ], teachers: [ "Kendo" ], performance: "B" },
	{ id: 7, name: "Alvera", subjects: [ "Chemistry" ], teachers: [ "Nami"], performance: "C" },
	{ id: 8, name: "Dennis", subjects: [ "Chemistry" ], teachers: [ "Nami"], performance: "A" },
	{ id: 9, name: "Leo", subjects: [ "Chemistry" ], teachers: [ "Nami"], performance: "B" },
	{ id: 10, name: "Donna", subjects: [ "Chemistry" ], teachers: [ "Nami"], performance: "B" }
];


@Injectable()
export class SchoolService{
	
	getTeacherInfo(id: number) : Observable<Teacher>{
		return Observable.of(teachers.find( t => t.id == id)).delay(1000).do((teacher) => console.log('Teacher requested for ' + JSON.stringify(teacher)));
	}
	
	getStudentInfo(id: number) : Observable<Student>{
		return Observable.of(students.find( t => t.id == id)).delay(1000).do((student) => console.log('Student requested for ' + JSON.stringify(student)));
	}

	getStudentsByTeacher(id: number) : Observable<StudentKey[]>{
		let teacher = teachers.find(t => t.id === id).name;
		let studentsArray = students.filter(s => s.teachers.find(t => t === teacher) !== undefined ).map(s => <StudentKey>{name: s.name, id: s.id });
		return Observable.of(studentsArray).delay(1000).do((student) => console.log('Students requested for ' + teacher));
	}

	getSubjectsByTeacher(id: number) : Observable<string[]>{
		return Observable.of(teachers.find(t=>t.id === id).subjects).delay(1000).do((subjects) => console.log('Teacher subjects ' + JSON.stringify(subjects)));
	}

	login(name: string) : Observable<Context>{
		let teacher = teachers.find(t => t.name === name);
		if(teacher)
			return Observable.of({id : teacher.id, role : "teacher"}).delay(500);
		let student = students.find(t => t.name === name);
		if(student)
			return Observable.of({id : student.id, role : "student"}).delay(500);

		return Observable.of({id : -1, role : "none"}).delay(500);
	}

}