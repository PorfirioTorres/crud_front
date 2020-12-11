// import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form.component';
import { EmployeeEditComponent } from './employee-edit.component';
import { EmployeeProfileComponent } from './employee-profile.component';
import { EmployeeListComponent } from './employee-list.component';

export const EMPLOYEEROUTES: Routes = [
    { path: 'add', component: EmployeeFormComponent },
    { path: 'edit', component: EmployeeEditComponent },
    { path: 'edit/:id', component: EmployeeEditComponent },
    { path: 'profile', component: EmployeeProfileComponent },
    { path: 'profile/:id', component: EmployeeProfileComponent },
    { path: 'list/:page', component: EmployeeListComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'list/1' }
];

/*
@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  // exports: [RouterModule]
})
// export class AppRoutingModule { } */
