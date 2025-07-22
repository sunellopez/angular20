import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserSession(): string | null {
    return localStorage.getItem('user');
  }
}
