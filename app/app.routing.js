"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./login.component');
var teacher_component_1 = require('./teacher.component');
var teacher_subjects_component_1 = require('./teacher-subjects.component');
var teacher_students_component_1 = require('./teacher-students.component');
var student_detail_component_1 = require('./student-detail.component');
var route_guard_1 = require('./route.guard');
var routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'teacher/:id',
        component: teacher_component_1.TeacherComponent,
        canActivate: [route_guard_1.RouteGuard],
        canActivateChild: [route_guard_1.RouteGuard],
        children: [
            {
                path: 'subjects',
                component: teacher_subjects_component_1.TeacherSubjectsComponent
            },
            {
                path: 'students',
                component: teacher_students_component_1.TeacherStudentsComponent
            },
            {
                path: '',
                component: teacher_subjects_component_1.TeacherSubjectsComponent
            }
        ]
    },
    {
        path: 'student-detail/:id',
        component: student_detail_component_1.StudentDetailComponent,
        canActivate: [route_guard_1.RouteGuard]
    }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map