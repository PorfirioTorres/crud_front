import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../../models/Employee';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() employee: Employee;
  public formu: FormGroup;
  private formBuilder: FormBuilder;

  constructor() {
    this.loadComponents();
   }

  ngOnInit(): void {
  }

  private loadComponents(): void {
    this.formu = this.formBuilder.group({
      firstName: [this.employee.firstName, [Validators.required]],
      lastName: [this.employee.lastName, [Validators.required]],
      hireDate: [this.employee.hireDate, [Validators.required]],
      email: [this.employee.email, [
        Validators.required,
        Validators.pattern('^([A-Za-z]+)([0-9]+)?([A-Za-z0-9\.\_]+)?\@(([A-Za-z]+)([0-9]+)?([A-Za-z0-9\.\_]+)?)((\.)([a-zA-Z]+))$')
      ]],
      region: [this.employee.region, [Validators.required]],
      salary: [this.employee.salary, [Validators.required]],
      commission: [this.employee.commissionPCT, [Validators.required]],
      department: [this.employee.department, [Validators.required]]
    });
  }

  public save(): void {}

}
