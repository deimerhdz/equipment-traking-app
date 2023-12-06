import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Equipment } from '../../interface/equipment.interface';
import { EquipmentService } from '../../service/equipment.service';
import Swal from 'sweetalert2';


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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
       this.equipmentService.deleteEquipmentById(id).subscribe(response=>{
        console.log(response);       
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        this.listEquipments();
       })
      }
    });
  }
 
}
