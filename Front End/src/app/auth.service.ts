import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // login(credentials: { email: string, password: string }): Observable<any>  {
  //   return this.http.post<any>(`https://localhost:7187/api/Auth/login`, credentials);
  // }
  // login(credentials: any): Observable<any> {
  //   return this.http.post('https://localhost:7187/api/Auth/login', credentials);
  // }
  login(email: string, password: string): Observable<any> {
    return this.http.post('https://localhost:7187/api/Auth/login', { email, password });
  }
}

