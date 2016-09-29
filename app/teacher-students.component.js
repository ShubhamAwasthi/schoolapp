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
var school_service_1 = require('./school.service');
var router_1 = require('@angular/router');
var TeacherStudentsComponent = (function () {
    function TeacherStudentsComponent(schoolService, activatedRoute, router) {
        this.schoolService = schoolService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.selectedId = -1;
    }
    TeacherStudentsComponent.prototype.selectId = function (student) {
        this.selectedId = student.id;
    };
    TeacherStudentsComponent.prototype.isSelected = function (id) {
        return this.selectedId === id;
    };
    TeacherStudentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.forEach(function (v) {
            var id = +v['id'];
            _this.students = _this.schoolService.getStudentsByTeacher(id);
        });
    };
    TeacherStudentsComponent.prototype.goToStudent = function () {
        this.router.navigate(['/student-detail', this.selectedId], { preserveQueryParams: true });
    };
    TeacherStudentsComponent = __decorate([
        core_1.Component({
            template: "\n\t\t\t\t<div class=\"center\">\n\t\t\t\t\t<b>Subjects</b>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li *ngFor=\"let student of students | async\" (click)=\"selectId(student)\" [class.selected]=\"isSelected(student.id)\">\n\t\t\t\t\t\t\t<span>{{student.name}}</span>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t<div>\n\t\t\t\t<button type=\"button\" [hidden]=false (click)=\"goToStudent()\">View Detail</button>\n\t\t\t\t",
            styles: ["\n\t\t\t\tli.selected span{\n\t\t\t\t\tborder : 1px solid black;\n\t\t\t\t}\n\t\t\t"]
        }), 
        __metadata('design:paramtypes', [school_service_1.SchoolService, router_1.ActivatedRoute, router_1.Router])
    ], TeacherStudentsComponent);
    return TeacherStudentsComponent;
}());
exports.TeacherStudentsComponent = TeacherStudentsComponent;
//# sourceMappingURL=teacher-students.component.js.map