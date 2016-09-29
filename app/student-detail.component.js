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
var StudentDetailComponent = (function () {
    function StudentDetailComponent(schoolService, route, router) {
        this.schoolService = schoolService;
        this.route = route;
        this.router = router;
    }
    StudentDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.route.snapshot.params['id'];
        this.subscription = this.route.queryParams.map(function (params) { return JSON.parse(params['context'] || '{}'); })
            .subscribe(function (val) { _this.teacherId = val.id; _this.teacherView = (val.role === "teacher"); });
        this.schoolService.getStudentInfo(id).toPromise()
            .then(function (res) { return _this.student = res; });
    };
    StudentDetailComponent.prototype.goBack = function () {
        this.router.navigate(['/teacher', this.teacherId], { preserveQueryParams: true });
    };
    StudentDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    StudentDetailComponent = __decorate([
        core_1.Component({
            template: "\n\t\t\t\t<div class=\"center\" *ngIf=\"student\">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<h3>Name</h3><br>\n\t\t\t\t\t\t<p>{{student.name}}</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<h3>Subjects</h3><br>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li *ngFor=\"let sub of student.subjects\">{{sub}}</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<h3>Teachers</h3><br>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li *ngFor=\"let tech of student.teachers\">{{tech}}</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t<h3>Performance</h3><br>\n\t\t\t\t\t<p>{{student.performance}}</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<button type=\"button\" [hidden]=\"!teacherView\" (click)=\"goBack()\">Go back</button>\n\t\t\t\t",
            styles: ["\n\t\t\t\t.center{\n\t\t\t\t\tdisplay : flex;\n\t\t\t\t\tflex-wrap : wrap;\n\t\t\t\t\tmargin : auto;\n\t\t\t\t\tmin-width : 500px;\n\t\t\t\t\theight : 200px;\n\t\t\t\t\tleft : 0;\n\t\t\t\t\tright : 0;\n\t\t\t\t\ttop : 0;\n\t\t\t\t\tbottom : 0;\n\t\t\t\t\tposition  : absolute;\n\t\t\t\t\tcontent-align : center;\n\t\t\t\t\t\n\t\t\t\t}\n\t\t\t\tdiv div{\n\t\t\t\t\tmax-width : 400px;\n\t\t\t\t\tborder: 1px solid black;\n\t\t\t\t\tradius : 200px;\n\t\t\t\t\tpadding : 40px;\n\t\t\t\t\tcontent-align : center;\n\t\t\t\t\tmargin : 10px;\n\t\t\t\t\tborder-radius : 25px;\n\t\t\t\t}\n\t\t\t\tdiv p, div ul{\n\t\t\t\t\t\ttext-align : right;\n\t\t\t\t}\n\t\t\t\th3 {\n\t\t\t\t\ttext-align : center;\n\t\t\t\t}\n\t\t\t\tul{\n\t\t\t\t\tlist-style-type : none;\n\t\t\t\t}\n\t\t\t"]
        }), 
        __metadata('design:paramtypes', [school_service_1.SchoolService, router_1.ActivatedRoute, router_1.Router])
    ], StudentDetailComponent);
    return StudentDetailComponent;
}());
exports.StudentDetailComponent = StudentDetailComponent;
//# sourceMappingURL=student-detail.component.js.map