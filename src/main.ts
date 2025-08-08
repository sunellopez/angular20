import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './app/token.interceptor';
import { LOCALE_ID } from '@angular/core';
import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import localeEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

registerLocaleData(localeEs);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(
      {
        mode: 'ios',
      }
    ),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([tokenInterceptor]),
      withFetch()
    ),
    { provide: LOCALE_ID, useValue: 'es-MX' },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'MXN'},
    provideLottieOptions({
      player: () => player,
    })
  ],
});