import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private httpClient: HttpClient) { }

  public validateEmailExists(control: FormControl): Promise<AlreadyExists> {
    if (!control.value) {
      return;
    }

    return new Promise((resolve, reject) => {
      const httpParams = new HttpParams().set('email', control.value);
      this.httpClient.get('http://localhost/employees/exists', { params: httpParams }).subscribe(
        (resp: any) => {
          if (resp.error) {
            resolve ({ exists: true });
          } else {
            resolve ({ exists: null });
          }
        },
        err => {
          reject( err.error.message);
        }
      );
    });
  }
}

interface AlreadyExists {
  [exists: string]: boolean;
}
