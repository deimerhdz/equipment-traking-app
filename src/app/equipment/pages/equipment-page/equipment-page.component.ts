import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Equipment } from '../../interface/equipment.interface';
import { EquipmentService } from '../../service/equipment.service';


@Component({
  selector: 'app-equipment-page',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './equipment-page.component.html',
  styleUrl: './equipment-page.component.css'
})
export class EquipmentPageComponent implements OnInit{
  private equipmentService = inject(EquipmentService);
  public equipments :Equipment[]=[];
  private router:Router = inject(Router);

  ngOnInit(): void {
    this.listEquipments();
  }
  editEquipment(id?:string){
    this.router.navigateByUrl('/dashboard/equipments/edit-equipment/'+id)
  }
  listEquipments(){
    this.equipmentService.getAllEquipments().subscribe(data=>{
      this.equipments = data.equipments;
    })
  }
  deletEequipment(id?:string){

  }
 
}
