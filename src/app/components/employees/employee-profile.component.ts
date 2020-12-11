import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validations } from '../../utils/Validations';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html'
})
export class EmployeeProfileComponent implements OnInit {
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
