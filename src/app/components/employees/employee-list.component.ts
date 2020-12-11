import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/Employee';
import { Validations } from '../../utils/Validations';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[];
  private validations: Validations;
  public numPage: number;
  public totalPages: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.validations = new Validations();
    this.totalPages = 7;
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.page) {
          if (this.validations.validateNumber(params.page)) {
            this.numPage = Number(params.page);

            this.getEmployees(this.numPage);
          } else {
            this.numPage = undefined;
            // el parametro no es valido, mostrar error
          }
        }
      }
    );
  }

  private getEmployees(page: number): void {
    // ir al service por los datos
  }

  public delEmployee(id: number): void {

  }

}
