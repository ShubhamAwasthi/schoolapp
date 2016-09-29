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
var LoginComponent = (function () {
    function LoginComponent(schoolService, router) {
        this.schoolService = schoolService;
        this.router = router;
        this.incorrectLogin = false;
        this.logInUnderway = false;
    }
    LoginComponent.prototype.ngOnDestroy = function () {
        if (this.logInSubscription)
            this.logInSubscription.unsubscribe();
    };
    LoginComponent.prototype.login = function (name) {
        var _this = this;
        this.logInUnderway = true;
        this.incorrectLogin = false;
        this.logInSubscription = this.schoolService.login(name).subscribe(function (value) {
            if (value.id === -1)
                _this.incorrectLogin = true;
            else {
                _this.routeToPage(value);
                console.log("login passed for" + JSON.stringify(value));
            }
        }, function (error) {
            _this.incorrectLogin = true;
            _this.logInUnderway = false;
        }, function () {
            _this.logInUnderway = false;
        });
    };
    LoginComponent.prototype.routeToPage = function (value) {
        var navigationextras = {
            queryParams: { 'context': JSON.stringify(value) }
        };
        if (value.role === "teacher")
            this.router.navigate(["/teacher", value.id], navigationextras);
        if (value.role === "student")
            this.router.navigate(["/student-detail", value.id], navigationextras);
    };
    LoginComponent = __decorate([
        core_1.Component({
            template: "<div class=\"center\">\n\t\t\t\t\t<h3>Log In</h3>\n\t\t\t\t\t<input #name type=\"text\" (keyup.enter)=\"login(name.value)\"/>\n\t\t\t\t\t<button type=\"button\" (click)=\"login(name.value)\">login</button>\n\t\t\t\t\t<p *ngIf=\"incorrectLogin\">Wrong name!</p>\n\t\t\t\t\t<p *ngIf=\"logInUnderway\">Attempting to log in!</p>\n\t\t\t\t<div>\n\t\t\t\t",
            styles: ["\n\t\t\t\t.center{\n\t\t\t\t\tmargin: auto;\n\t\t\t\t\twidth: 400px;\n\t\t\t\t\theight: 400px;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\tbottom: 0;\n\t\t\t\t\tright: 0;\n\t\t\t\t\tposition: absolute;\n\t\t\t\t}\n\t\t\t"]
        }), 
        __metadata('design:paramtypes', [school_service_1.SchoolService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map