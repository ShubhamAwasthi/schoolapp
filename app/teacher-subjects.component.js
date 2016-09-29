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
var TeacherSubjectsComponent = (function () {
    function TeacherSubjectsComponent(schoolService, activatedRoute) {
        this.schoolService = schoolService;
        this.activatedRoute = activatedRoute;
    }
    TeacherSubjectsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.forEach(function (v) {
            var id = +v['id'];
            console.log(v);
            _this.subjects = _this.schoolService.getSubjectsByTeacher(id);
        });
    };
    TeacherSubjectsComponent = __decorate([
        core_1.Component({
            template: "\n\t\t\t\t<div class=\"center\">\n\t\t\t\t\t<b>Subjects</b>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li *ngFor=\"let sub of subjects | async\">\n\t\t\t\t\t\t\t{{sub}}\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t<div>\n\t\t\t\t"
        }), 
        __metadata('design:paramtypes', [school_service_1.SchoolService, router_1.ActivatedRoute])
    ], TeacherSubjectsComponent);
    return TeacherSubjectsComponent;
}());
exports.TeacherSubjectsComponent = TeacherSubjectsComponent;
//# sourceMappingURL=teacher-subjects.component.js.map