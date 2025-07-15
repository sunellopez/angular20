import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './service/auth/auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectamos el AuthService para obtener el token de autenticación
  const authToken = inject(AuthService).getAuthToken();  // Aquí llamamos a tu método para obtener el token

  // Si el token está presente, clonamos la solicitud y añadimos el encabezado de autorización con Bearer Token
  if (authToken) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,  // Aquí agregamos el Bearer Token
      },
    });

    // Pasamos la solicitud modificada al siguiente manejador
    return next(newReq);
  }

  // Si no hay token, simplemente continuamos con la solicitud original
  return next(req);
};
