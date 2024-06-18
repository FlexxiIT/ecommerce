import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorInterceptor } from './interceptors/error.interceptor';
import { interceptorCart} from './interceptors/cart.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),provideToastr(), provideAnimations(),
    provideHttpClient(withInterceptors([interceptorCart,errorInterceptor]))]
};
