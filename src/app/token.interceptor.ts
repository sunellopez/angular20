import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './service/auth/auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    // Inyectamos el AuthService para obtener el token de autenticación
    const authToken = inject(AuthService).getAuthToken();  // Aquí llamamos a tu método para obtener el token

  // Preparamos headers base con ngrok skip header
    const headersConfig: Record<string, string> = {
      'ngrok-skip-browser-warning': '1',
    };

    // Si hay token, agregamos Authorization
    if (authToken) {
      headersConfig['Authorization'] = `Bearer ${authToken}`;
    }

    const newReq = req.clone({
      setHeaders: headersConfig,
    });
    
    return next(newReq);
};