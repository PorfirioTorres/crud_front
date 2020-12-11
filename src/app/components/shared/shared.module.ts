import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { PaginateComponent } from './paginate/paginate.component';




@NgModule({
  declarations: [
    NavbarComponent,
    FormComponent,
    PaginateComponent
  ],
  exports: [
    NavbarComponent,
    FormComponent,
    PaginateComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
