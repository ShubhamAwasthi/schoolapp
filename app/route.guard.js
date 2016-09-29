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
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var school_service_1 = require('./school.service');
require('rxjs/add/operator/map');
var RouteGuard = (function () {
    function RouteGuard(router, schoolService) {
        this.router = router;
        this.schoolService = schoolService;
        this.teacher = "teacher";
        this.studentPath = "student-detail";
    }
    RouteGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var context = JSON.parse(route.queryParams['context'] || '{}');
        if (route.url.length == 0)
            return true;
        console.log(route.url[0].path);
        if (route.url[0].path === this.teacher) {
            if (+context.id !== +(route.url[1].path)) {
                console.log("Trying to access id " + route.url[1].path + " but id in context " + context.id);
                return false;
            }
            if (context.role !== this.teacher) {
                console.log("Trying to access id " + route.url[1].path + " but role is " + context.role + " needed teacher role");
                return false;
            }
            return true;
        }
        else if (route.url[0]["path"] === this.studentPath) {
            if (+context.id !== +(route.url[1].path) && context.role != this.teacher) {
                console.log("Trying to access id " + route.url[1].path + " but id in context " + context.id);
                return false;
            }
            if (context.role === this.teacher) {
                return this.schoolService.getTeacherInfo(+context.id).toPromise()
                    .then(function (res) { return _this.students = res.students; })
                    .then(function () {
                    var s = (_this.students.find(function (t) { return t === +(route.url[1].path); }) !== undefined);
                    if (!s)
                        console.log("Trying to access id " + route.url[1].path + " but this is not student of " + context.id);
                    return s;
                });
            }
        }
        return true;
    };
    RouteGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    RouteGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, school_service_1.SchoolService])
    ], RouteGuard);
    return RouteGuard;
}());
exports.RouteGuard = RouteGuard;
//# sourceMappingURL=route.guard.js.map