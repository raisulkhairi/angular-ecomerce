/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './app/core/authentication/auth.service';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    AuthService,
],
})
