import { Routes } from '@angular/router';
import { routesauth } from './pages/auth/auth.routes';
import path from 'path';
import { routesadmin } from './pages/admin/admin.routes';
import { loginGuard } from './core/guard/sesion.guard';

export const routes: Routes = [

    {
        path: "",
       redirectTo: "auth", 
       pathMatch: "full"
    },

    { 
        path: "auth",
        children: routesauth
    },
    {
        path: 'admin',
        canActivate: [loginGuard],
        children: routesadmin
        
    },
    {
        path: "**",
        redirectTo: "admin",
        pathMatch: "full"
    }
];
