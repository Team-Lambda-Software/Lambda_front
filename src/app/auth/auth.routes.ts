
import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { ResetPasswordPageComponent } from './pages/change-password/reset-password-page/reset-password-page.component';
import { VerificationPasswordPageComponent } from './pages/change-password/verification-password-page/verification-password-page.component';
import { CreatePasswordPageComponent } from './pages/change-password/create-password-page/create-password-page.component';
import { CreatePasswordConfirmPageComponent } from './pages/change-password/create-password-confirm-page/create-password-confirm-page.component';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'signup',
        path: 'signup',
        component: RegisterPageComponent
      },
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'location',
        component: LocationPageComponent
      },
      {
        path: 'resetpassword',
        component: ResetPasswordPageComponent
      },
      {
        path: 'verificationcode',
        component: VerificationPasswordPageComponent
      },
      {
        path: 'createpassword',
        component: CreatePasswordPageComponent
      },
      {
        path: 'confirmpassword',
        component: CreatePasswordConfirmPageComponent
      },
    ]
  }
]
