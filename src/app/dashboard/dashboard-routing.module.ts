import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { isAuthenticatedGuard } from '../auth/guards/isAuthenticated.guard';

const routes: Routes = [
  {
    path:'',
    component:DashboardLayoutComponent,
    canActivate:[isAuthenticatedGuard],
    children:[
      {
        path:'equipments',
        loadChildren:()=>import(`../equipment/equipment.module`).then(m=>m.EquipmentModule)
      },
      {
        path:'reports',
        loadChildren:()=>import(`../report/report.module`).then(m=>m.ReportModule)
      },
      {
        path:'**',
        redirectTo:'equipments'
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
