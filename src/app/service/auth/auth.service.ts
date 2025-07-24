import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authTokenKey = 'auth_token';

  // Signal que guarda el Bearer Token (puedes cambiar a otro tipo si lo prefieres)
  private authToken = signal<string | null>(this.getAuthTokenFromStorage());
  private http = inject(HttpClient);

  constructor() {}

  // Método para obtener el Bearer Token
  getAuthToken(): string {
    return this.authToken() ?? '';  // Si no hay token, devolvemos un string vacío
  }

  // Método para establecer el Bearer Token
  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.authToken.set(token);  // Actualizamos el Signal con el nuevo token
  }

  // Método para obtener el token desde el almacenamiento
  private getAuthTokenFromStorage(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // Método para eliminar el Bearer Token (logout)
  logout() {
    return this.http.post(`${environment.apiUrl}/logout`,{})
  }
  
  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, { email, password });
  }

  async setSession(user: any) {
    await localStorage.setItem('user', JSON.stringify(user));
  }
}