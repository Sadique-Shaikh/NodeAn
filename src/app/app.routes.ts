import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { title: "EMS | DASHBOARD", path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { title: "EMS | DASHBOARD", path: 'dashboard', component: DashboardComponent },
    { title: "EMS | REGISTRATION", path: 'register', component: RegistrationComponent },
    { title: "EMS | LOGIN", path: 'login', component: LoginComponent },
];