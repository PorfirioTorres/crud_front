import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private httpClient: HttpClient) { }

  public validateEmailExists(email: string, id: number): Promise<AlreadyExists> {
    return new Promise((resolve, reject) => {
      let httpParams = new HttpParams();
      httpParams = httpParams.set('email', email);
      httpParams = httpParams.set('id', id.toString());
      this.httpClient.get('http://localhost:8080/employees/exists', { params: httpParams }).subscribe(
        (resp: any) => {
          if (resp.error) {
            resolve ({ exists: true });
          } else {
            resolve (null);
          }
        },
        err => {
          reject( err.error.message);
        }
      );
    });
  }
}

export interface AlreadyExists {
  [exists: string]: boolean;
}
