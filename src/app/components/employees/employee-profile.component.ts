import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validations } from '../../utils/validations';
import { Util } from '../../utils/util';
import { Employee } from '../../models/Employee';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html'
})
export class EmployeeProfileComponent implements OnInit {
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
          // this.searchEmployeeById(params.id);
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
    this.router.navigate(['/employees/profile', id]);
  }

  private findEmployee(): void {
    this.employeeService.getEmployee(this.id).subscribe(
      resp => {
        this.employee = resp;
      },
      err => {
        this.id = undefined;
        this.employee = undefined;
        if (err.status === 500) {
          Swal.fire('Error', err.error.message, 'error');
        } else {
          Swal.fire('Sin resultados', err.error.message, 'warning');
        }
      }
    );
  }

  public getVacationPerception(): void {
    Util.showLoading();
    this.employeeService.calculateVacationalPercept(this.employee).subscribe(
      resp => {
        const bono = (Math.round(resp.bonus * 100) / 100).toFixed(2);
        const total = (Math.round(resp.total * 100) / 100).toFixed(2);
        const perceptions = `
        <p> No. días: <strong>${resp.days}</strong></p>
        <p> Bono: <strong>$ ${bono}</strong></p>
        <p> Total perception: <strong>$ ${total}</strong></p>
        `;
        Swal.close();
        Swal.fire('información', perceptions, 'success');
      },
      err => {
        Swal.close();
        Swal.fire('Ocurrió un error', err.error.message, 'error');
      }
    );
  }
}
