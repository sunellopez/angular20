import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = inject(AuthService).getAuthToken();

  if (token) {
    return true; 
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
