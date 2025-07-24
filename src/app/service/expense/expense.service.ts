import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  
  constructor() { }

  // getAll(): Observable<Expense[]> {
  //   return this.http.get<Expense[]>(this.apiUrl);
  // }

  add(expense: any) {
    return this.http.post(`${this.apiUrl}/expenses`, expense);
  }

  getWeeklySummary() {
    return this.http.get(`${this.apiUrl}/expenses/summary`);
  }
}
