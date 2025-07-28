import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Expense, Summary } from '@interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  
  constructor() { }

  getExpenses(page: number = 1):Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expenses?page=${page}`);
  }

  add(expense: any) {
    return this.http.post(`${this.apiUrl}/expenses`, expense);
  }

  getWeeklySummary():Observable<Summary> {
    return this.http.get<Summary>(`${this.apiUrl}/expenses/summary`);
  }
}
