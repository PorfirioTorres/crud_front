import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  public employee: Employee;

  constructor() {
    this.employee = new Employee();
  }

  ngOnInit(): void {
  }

}
