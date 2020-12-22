import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/Employee';
import { Validations } from '../../utils/validations';
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

  constructor(private activatedRoute: ActivatedRoute, private employeeService: EmployeeService,
              private router: Router) {
    this.validations = new Validations();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id) {
          const id = params.id.trim();
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
      }
    );
  }


  public searchEmployeeById(id: string): void {
    if (id.trim().length === 0) {
      return;
    }
    this.router.navigate(['/employees/edit', id]);
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
