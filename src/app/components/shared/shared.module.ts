import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { PaginateComponent } from './paginate/paginate.component';
import { ReactiveFormsModule } from '@angular/forms';

//// para la fecha
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-Mx';
registerLocaleData(localeES, 'es-MX');




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
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
