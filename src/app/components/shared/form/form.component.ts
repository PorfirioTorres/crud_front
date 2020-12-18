import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../../models/Employee';
import { combineLatest } from 'rxjs';
import { EmployeeService } from '../../../services/employee.service';
import { ValidateService } from '../../../services/validate.service';
import { Region } from '../../../models/Region';
import { Department } from '../../../models/Department';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() employee: Employee;
  public formu: FormGroup;
  private formBuilder: FormBuilder;
  private action: string;

  public regions: Region[];
  public departments: Department[];

  constructor(private employeeService: EmployeeService, private validateService: ValidateService) {
    this.loadComponents();
    this.listenValuesChanges();
  }

  ngOnInit(): void {
    if (this.employee) {
      this.action = 'update';
    } else {
      this.action = 'save';
    }

    combineLatest([
      this.employeeService.getRegions(),
      this.employeeService.getDepartments()

    ]).subscribe(
      ([regions, departments]) => {
        this.regions = regions;
        this.departments = departments;
      },
      err => {
        console.log(err);
        Swal.fire('Ha ocurrido un error', err.error.message, 'error');
      }
    );
  }

  private loadComponents(): void {
    this.formu = this.formBuilder.group({
      firstName: [this.employee.firstName, [Validators.required]],
      lastName: [this.employee.lastName, [Validators.required]],
      hireDate: [this.employee.hireDate, [Validators.required]],
      email: [this.employee.email,
              [
                Validators.required,
                Validators.pattern('^([A-Za-z]+)([0-9]+)?([A-Za-z0-9\.\_]+)?\@(([A-Za-z]+)([0-9]+)?([A-Za-z0-9\.\_]+)?)((\.)([a-zA-Z]+))$')
              ],
              [this.validateService.validateEmailExists]
            ],
      region: [this.employee.region, [Validators.required]],
      salary: [this.employee.salary,
                [
                 Validators.required,
                 Validators.pattern('^[1-9]([0-9]){0,5}(\.([0-9]){2})?$')
                ]
              ],
      commission: [this.employee.commissionPCT,
                    [
                     Validators.required,
                     Validators.pattern('^0(\.([0-9]){1,2})?$')
                    ]
                  ],
      department: [this.employee.department, [Validators.required]]
    });
  }

  private listenValuesChanges(): void {
    this.formu.get('firstName').valueChanges.subscribe(
      change => {
        this.employee.firstName = change;
    });

    this.formu.get('lastName').valueChanges.subscribe(
      change => {
        this.employee.lastName = change;
    });

    this.formu.get('hireDate').valueChanges.subscribe(
      change => {
        this.employee.hireDate = change;
    });

    this.formu.get('email').valueChanges.subscribe(
      change => {
        this.employee.email = change;
    });

    this.formu.get('region').valueChanges.subscribe(
      change => {
        this.employee.region = change;
    });

    this.formu.get('salary').valueChanges.subscribe(
      change => {
        this.employee.salary = change;
    });

    this.formu.get('commission').valueChanges.subscribe(
      change => {
        this.employee.commissionPCT = change;
    });

    this.formu.get('department').valueChanges.subscribe(
      change => {
        this.employee.department = change;
    });
  }
///////////// validar si se deben mostrar los mensajes de error de cada campo ///////////////////
  public get validateFName(): boolean {
    return this.formu.get('firstName').invalid && this.formu.get('firstName').touched;
  }

  public get validateLName(): boolean {
    return this.formu.get('lastName').invalid && this.formu.get('lastName').touched;
  }

  public get validateHireDate(): boolean {
    return this.formu.get('hireDate').invalid && this.formu.get('hireDate').touched;
  }

  public get validateEmail(): boolean {
    return this.formu.get('email').invalid && this.formu.get('email').touched;
  }

  public get validateRegion(): boolean {
    return this.formu.get('region').invalid && this.formu.get('region').touched;
  }

  public get validateSalary(): boolean {
    return this.formu.get('salary').invalid && this.formu.get('salary').touched;
  }

  public get validateCommission(): boolean {
    return this.formu.get('commission').invalid && this.formu.get('commission').touched;
  }

  public get validateDepartment(): boolean {
    return this.formu.get('department').invalid && this.formu.get('department').touched;
  }

  public get exists(): boolean {
    return this.formu.get('email').getError('exists');
  }
///////////////////////////////////////////////////////////////////////////////////////////////

  public save(): void {
    if (this.formu.valid) {
      // formulario valido ir al servicio
      console.log(this.formu.controls);
      if (this.action === 'save') {
        console.log('guardar');
        this.employeeService.saveEmployee(this.employee).subscribe(
          resp => {
            Swal.fire('Éxito', resp.success, 'success');
          },
          err => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
      } else if (this.action === 'update') {
        console.log('actualizar');
        this.employeeService.updateEmployee(this.employee).subscribe(
          resp => {
            Swal.fire('Éxito', resp.success, 'success');
          },
          err => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
      }
    } else {
      console.log('no valido');
      this.markControls(this.formu);
    }
  }

  private markControls(fg: FormGroup): void {
    Object.values(fg.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markControls(control);
      } else {
        control.markAsTouched();
      }
    });
  }

}
