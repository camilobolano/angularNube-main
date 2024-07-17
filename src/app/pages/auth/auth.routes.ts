import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';

export const routesauth: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    
    {
        path: 'login',
        component: LoginComponent,
    },

    {
        path: 'register',
        component: RegisterComponent,
    },
   

];