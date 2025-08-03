import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserResponse } from '@interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  
  constructor() { }

  getUserSession(): string | null {
    return localStorage.getItem('user');
  }

  getUserInfo(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/profile`);
  }
  
  updateUserInfo(name: string, email: string): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/update-profile`, { name, email });
  }
}
