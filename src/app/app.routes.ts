import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './auth/guards/IsNotAuthenticated.guard';

export const routes: Routes = [
    {
        path:'auth',
        canActivate:[isNotAuthenticatedGuard],
        loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
    },
    {
        path:'dashboard',
        loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
    },
    {
        path:'**',
        redirectTo:'auth'
    }
];
