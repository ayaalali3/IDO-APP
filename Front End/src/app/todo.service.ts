import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://localhost:7187/api/ToDo'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getTodo(): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getToDosByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  CreateTodo(todo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, todo);
  }

  updateTodo(todo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, todo);
  }
}
