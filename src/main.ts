import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from '../src/app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr({
      positionClass: 'toast-center',
      toastClass: 'toast-custom-style', // Toasts will appear in the top right corner
      // timeOut: 3000,
      preventDuplicates: true,
    }),
    provideAnimations(),
  ],
});
