import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../models/Region';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Department } from '../models/Department';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private urlEmployees: string;
  private httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.urlEmployees = 'http://localhost:8080/employees';
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  }

  public getRegions(): Observable<Region[]> {
    return this.httpClient.get('http://localhost:8080/regions/all').pipe(
      map((resp: any) => resp.regions as Region[])
    );
  }

  public getDepartments(): Observable<Department[]> {
    return this.httpClient.get('http://localhost:8080/departments/all').pipe(
      map((resp: any) => resp.departments as Department[])
    );
  }

  public getEmployeesPage(page: number): Observable<any> {
    return this.httpClient.get(`${this.urlEmployees}/page/${page}`);
  }

  public getEmployee(id: number): Observable<Employee> {
    return this.httpClient.get(`${this.urlEmployees}/employee/${id}`).pipe(
      map((resp: any) => resp.employee as Employee)
    );
  }

  public saveEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post(`${this.urlEmployees}/manage`, employee, { headers: this.httpHeaders });
  }

  public updateEmployee(employee: Employee): Observable<any> {
    return this.httpClient.put(`${this.urlEmployees}/manage`, employee, { headers: this.httpHeaders });
  }

  public deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(`${this.urlEmployees}/manage/${id}`);
  }

  public calculateVacationalPercept(employee: Employee): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('id', employee.employeeId.toString());
    httpParams = httpParams.set('hdate', employee.hireDate);

    return this.httpClient.get(`${this.urlEmployees}/vacations`, { params: httpParams }).pipe(
      map((resp: any) => ({days: resp.days, bonus: resp.bonus, total: resp.total }))
    );
  }
}
