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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var login_component_1 = require('./login.component');
var school_service_1 = require('./school.service');
var app_routing_1 = require('./app.routing');
var teacher_component_1 = require('./teacher.component');
var teacher_subjects_component_1 = require('./teacher-subjects.component');
var teacher_students_component_1 = require('./teacher-students.component');
var route_guard_1 = require('./route.guard');
var student_detail_component_1 = require('./student-detail.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing],
            declarations: [app_component_1.AppComponent, login_component_1.LoginComponent, teacher_component_1.TeacherComponent, teacher_subjects_component_1.TeacherSubjectsComponent, teacher_students_component_1.TeacherStudentsComponent, student_detail_component_1.StudentDetailComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [school_service_1.SchoolService, route_guard_1.RouteGuard]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map