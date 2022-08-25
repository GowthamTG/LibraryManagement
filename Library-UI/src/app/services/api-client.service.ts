import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  host: string = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  throwError(err: { error: { errorMessage: string } }): string {
    let message: string = err.error.errorMessage;
    throw message || 'Please try later';
  }

  getBooksCondition(filterDetails: any): Observable<any> {
    console.log(filterDetails);

    return this.http.post<any>(
      `${this.host}/based-on-condition`,
      filterDetails
    );
  }
}
