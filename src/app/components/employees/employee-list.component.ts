import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/Employee';
import { Validations } from '../../utils/validations';
import { Util } from '../../utils/util';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[];
  private validations: Validations;
  public numPage: number;
  public totalPages: number;

  constructor(private activatedRoute: ActivatedRoute, private employeeService: EmployeeService) {
    this.validations = new Validations();
   }

  ngOnInit(): void {
    Util.showLoading();
    this.activatedRoute.params.subscribe(
      params => {
        if (params.page) {
          if (this.validations.validateNumber(params.page)) {
            this.numPage = Number(params.page);

            this.getEmployees(this.numPage);
          } else {
            this.numPage = undefined;
            // el parametro no es valido, mostrar error
            Swal.fire('Error', 'Número de página no válido', 'error');
          }
        }
      }
    );
  }

  private getEmployees(page: number): void {
    this.employeeService.getEmployeesPage(page).subscribe(
      (result: any) => {
        this.employees = result.paginate.elements;
        this.totalPages = result.paginate.totalPages;
        Swal.close();
      },
      err => {
        Swal.close();
        if (err.status === 500) {
          Swal.fire('Error', err.error.message, 'error');
        } else {
          Swal.fire('Sin resultados', err.error.message, 'warning');
        }
      }
    );
  }

  public delEmployee(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminar al empleado: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe(
          response => {
            this.employees = this.employees.filter(emp => emp.employeeId !== id);
            Swal.fire(
              'Empleado eliminado!',
              'El empleado ha sido eliminado.',
              'success'
            );
          },
          e => {
            Swal.fire('Error', e.error.message, 'error');
          }
        );
      }
    });
  }

}
