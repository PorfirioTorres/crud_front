import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeePanelComponent } from './components/employees/employee-panel.component';
import { EMPLOYEEROUTES } from './components/employees/employee-routing.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  {
    path: 'employees', component: EmployeePanelComponent,
    children: EMPLOYEEROUTES
  },

  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
