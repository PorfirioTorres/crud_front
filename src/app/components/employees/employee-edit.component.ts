import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/Employee';
import { Validations } from '../../utils/Validations';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
  public id: number;
  public employee: Employee;
  private validations: Validations;

  constructor(private activatedRoute: ActivatedRoute) {
    this.validations = new Validations();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id) {
          this.searchEmployeeById(params.id);
        }
      }
    );
  }

  public searchEmployeeById(id: string): void {
    id = id.trim();

    if (this.validations.validateNumber(id)) { // validar id
      this.id = Number(id);
      this.findEmployee();
    } else {
      this.id = undefined;
      this.employee = undefined;
      // id no valido enviar mensaje de error
    }
  }

  private findEmployee(): void {}

}
