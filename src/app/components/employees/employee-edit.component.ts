import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/Employee';
import { Validations } from '../../utils/Validations';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
  public id: number;
  public employee: Employee;
  private validations: Validations;

  constructor(private activatedRoute: ActivatedRoute, private employeeService: EmployeeService) {
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
      Swal.fire('Error', 'id de empleado no válido', 'error');
    }
  }

  private findEmployee(): void {
    this.employeeService.getEmployee(this.id).subscribe(
      resp => {
        this.employee = resp;
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    );
  }

}
