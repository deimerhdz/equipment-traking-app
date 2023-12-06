import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';
import { AddEquipmentPageComponent } from './pages/add-equipment-page/add-equipment-page.component';

const routes: Routes = [
  {
    path:'',component:EquipmentPageComponent
  },
  {
    path:'new-equipment',
    component:AddEquipmentPageComponent
  },
  {
    path:'edit-equipment/:id',
    component:AddEquipmentPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
