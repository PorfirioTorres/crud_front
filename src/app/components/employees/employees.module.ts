import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EmployeeFormComponent } from './employee-form.component';
import { EmployeeProfileComponent } from './employee-profile.component';
import { EmployeePanelComponent } from './employee-panel.component';
import { EmployeeEditComponent } from './employee-edit.component';
import { EmployeeListComponent } from './employee-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    EmployeeFormComponent,
    EmployeeProfileComponent,
    EmployeePanelComponent,
    EmployeeEditComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class EmployeesModule { }
