import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../../models/Employee';
import { EmployeeService } from '../../../services/employee.service';
import { AlreadyExists, ValidateService } from '../../../services/validate.service';
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
  private action: string;
  private asycValueEmail: string;

  public regions: Region[];
  public departments: Department[];

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,
              private validateService: ValidateService) {
  }

  ngOnInit(): void {
    if (this.employee) {
      this.action = 'update';
      this.asycValueEmail = this.employee.email;
    } else {
      this.action = 'save';
    }

    // cargar los componentes del formulario
    this.loadComponents();
    this.listenValuesChanges();
    this.employeeService.getRegions().subscribe(
      resp => {
        this.regions = resp;
        this.employeeService.getDepartments().subscribe(
          result => {
            this.departments = result;
          },
          err => {
            Swal.fire('Ha ocurrido un error', err.error.message, 'error');
          }
        );
      },
      err => {
        Swal.fire('Ha ocurrido un error', err.error.message, 'error');
      }
    );
  }

  private loadComponents(): void {
    this.formu = this.formBuilder.group({
      firstName: [this.employee.firstName, [Validators.required]],
      lastName: [this.employee.lastName, [Validators.required]],
      hireDate: [this.employee.hireDate.slice(0, 10), [Validators.required]],
      email: [this.employee.email,
              [
                Validators.required,
                Validators.pattern('^([A-Za-z]+)([0-9]+)?([A-Za-z0-9\.\_]+)?\@(([A-Za-z]+)([0-9]+)?([A-Za-z0-9\.\_]+)?)((\.)([a-zA-Z]+))$')
              ],
              [this.validateEmailExists]
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
//////// validar si el email ya existe
  public validateEmailExists = (control: FormControl): Promise<AlreadyExists> => {
    if (control.value === this.asycValueEmail || !control.value) {
      // email sin cambios, no vamos al servicio;
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    }
    let id = this.employee.employeeId;

    if (!id) {
      id = 0;
    }
    return this.validateService.validateEmailExists(control.value, id);
  }
/////////////////////////////////////////////////////////////////////////////////////////////
///////// setear valores a los select con los valores del objeto
  public compareRegion(r1: Region, r2: Region): boolean {
    if (r1 === undefined && r2 === undefined) {
       return true;
    }
    if (r1 === undefined || r2 === undefined) {
      return false;
    } else {
      return r1.regionId === r2.regionId;
    }
  }

  public compareDepartment(d1: Department, d2: Department): boolean {
    if (d1 === undefined && d2 === undefined) {
       return true;
    }
    if (d1 === undefined || d2 === undefined) {
      return false;
    } else {
      return d1.departmentId === d2.departmentId;
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////
  public save(): void {
    if (this.formu.valid) {
      // formulario valido ir al servicio
      // console.log(this.formu.controls);

      console.log(this.formu.controls);
      if (this.action === 'save') {
        console.log('guardar');
        this.employeeService.saveEmployee(this.employee).subscribe(
          resp => {
            this.employee.employeeId = resp.id;
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
