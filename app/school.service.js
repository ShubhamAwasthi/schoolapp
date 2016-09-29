"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/of');
require('rxjs/add/operator/delay');
require('rxjs/add/operator/do');
var teachers = [
    { id: 1, name: "Takayama", subjects: ["Physics", "Maths"], students: [1, 2] },
    { id: 2, name: "James", subjects: ["English"], students: [1, 2, 3, 4] },
    { id: 3, name: "Mary", subjects: ["History", "English"], students: [3, 4] },
    { id: 4, name: "Kendo", subjects: ["Astronomy", "Maths"], students: [5, 6] },
    { id: 5, name: "Nami", subjects: ["Chemistry"], students: [7, 8, 9, 10] }
];
var students = [
    { id: 1, name: "Meso", subjects: ["Physics", "English"], teachers: ["Takayama", "James"], performance: "A" },
    { id: 2, name: "Prem", subjects: ["Physics", "English"], teachers: ["Takayama", "James"], performance: "B" },
    { id: 3, name: "Edna", subjects: ["History", "English"], teachers: ["Mary", "James"], performance: "B+" },
    { id: 4, name: "Kappa", subjects: ["History", "English"], teachers: ["Mary", "James"], performance: "A" },
    { id: 5, name: "Domino", subjects: ["Astronomy"], teachers: ["Kendo"], performance: "A-" },
    { id: 6, name: "Tony", subjects: ["Maths"], teachers: ["Kendo"], performance: "B" },
    { id: 7, name: "Alvera", subjects: ["Chemistry"], teachers: ["Nami"], performance: "C" },
    { id: 8, name: "Dennis", subjects: ["Chemistry"], teachers: ["Nami"], performance: "A" },
    { id: 9, name: "Leo", subjects: ["Chemistry"], teachers: ["Nami"], performance: "B" },
    { id: 10, name: "Donna", subjects: ["Chemistry"], teachers: ["Nami"], performance: "B" }
];
var SchoolService = (function () {
    function SchoolService() {
    }
    SchoolService.prototype.getTeacherInfo = function (id) {
        return Observable_1.Observable.of(teachers.find(function (t) { return t.id == id; })).delay(1000).do(function (teacher) { return console.log('Teacher requested for ' + JSON.stringify(teacher)); });
    };
    SchoolService.prototype.getStudentInfo = function (id) {
        return Observable_1.Observable.of(students.find(function (t) { return t.id == id; })).delay(1000).do(function (student) { return console.log('Student requested for ' + JSON.stringify(student)); });
    };
    SchoolService.prototype.getStudentsByTeacher = function (id) {
        var teacher = teachers.find(function (t) { return t.id === id; }).name;
        var studentsArray = students.filter(function (s) { return s.teachers.find(function (t) { return t === teacher; }) !== undefined; }).map(function (s) { return { name: s.name, id: s.id }; });
        return Observable_1.Observable.of(studentsArray).delay(1000).do(function (student) { return console.log('Students requested for ' + teacher); });
    };
    SchoolService.prototype.getSubjectsByTeacher = function (id) {
        return Observable_1.Observable.of(teachers.find(function (t) { return t.id === id; }).subjects).delay(1000).do(function (subjects) { return console.log('Teacher subjects ' + JSON.stringify(subjects)); });
    };
    SchoolService.prototype.login = function (name) {
        var teacher = teachers.find(function (t) { return t.name === name; });
        if (teacher)
            return Observable_1.Observable.of({ id: teacher.id, role: "teacher" }).delay(500);
        var student = students.find(function (t) { return t.name === name; });
        if (student)
            return Observable_1.Observable.of({ id: student.id, role: "student" }).delay(500);
        return Observable_1.Observable.of({ id: -1, role: "none" }).delay(500);
    };
    SchoolService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SchoolService);
    return SchoolService;
}());
exports.SchoolService = SchoolService;
//# sourceMappingURL=school.service.js.map