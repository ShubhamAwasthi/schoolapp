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
var router_1 = require('@angular/router');
var school_service_1 = require('./school.service');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var TeacherComponent = (function () {
    function TeacherComponent(route, schoolService) {
        this.route = route;
        this.schoolService = schoolService;
        this.subscriptions = [];
    }
    TeacherComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.context = this.route.queryParams.map(function (params) { return JSON.parse(params['context'] || '{}'); });
        var sub = this.context.subscribe(function (val) {
            _this.id = '' + _this.route.snapshot.params['id'];
            if (val.role == "teacher")
                _this.user = _this.schoolService.getTeacherInfo(val.id).map(function (val) { return val.name; });
            if (val.role == "student")
                _this.user = _this.schoolService.getStudentInfo(val.id).map(function (val) { return val.name; });
        });
        this.subscriptions.push(sub);
    };
    TeacherComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (x) { return x.unsubscribe(); });
    };
    TeacherComponent = __decorate([
        core_1.Component({
            selector: 'my-home',
            template: "Welcome {{user | async}}<hr>\n\t\t\t\t<nav>\n\t\t\t\t\t<a [routerLink]=\"['subjects',{'id' : id }]\" routerLinkActive=\"active\" [preserveQueryParams]=\"true\">Subjects</a>\n\t\t\t\t\t<a [routerLink]=\"['students',{'id': id }]\" routerLinkActive=\"active\" [preserveQueryParams]=\"true\">Students</a>\n\t\t\t\t</nav>\n\t\t\t\t<router-outlet></router-outlet>\n\t\t\t\t",
            styles: ["\n\t\t\t\t.active{\n\t\t\t\t\tbackground-color : green;\n\t\t\t\t}\n\t\t\t\t"]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, school_service_1.SchoolService])
    ], TeacherComponent);
    return TeacherComponent;
}());
exports.TeacherComponent = TeacherComponent;
//# sourceMappingURL=teacher.component.js.map