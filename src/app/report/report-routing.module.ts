import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { AddReportPageComponent } from './pages/add-report-page/add-report-page.component';

const routes: Routes = [
  {path:'',component:ReportPageComponent},
  {path:'new-report',component:AddReportPageComponent},
  {path:'edit-report/:id',component:AddReportPageComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
