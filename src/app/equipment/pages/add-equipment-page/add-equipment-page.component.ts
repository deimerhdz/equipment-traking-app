import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Equipment } from '../../interface/equipment.interface';
import { EquipmentService } from '../../service/equipment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-equipment-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-equipment-page.component.html',
  styleUrl: './add-equipment-page.component.css'
})
export class AddEquipmentPageComponent implements OnInit{


  private fb:FormBuilder = inject(FormBuilder);
  private equipmentService = inject(EquipmentService);
  private authService = inject(AuthService);
  private router = inject(Router);
  public equipmentForm :FormGroup = this.fb.group({
    name:['',Validators.required],
    description:['',Validators.required],
    stock:['',Validators.required],
    category:['',Validators.required],
    user:['',Validators.required],
    _id:[''],
  });
  private activateRoute:ActivatedRoute = inject(ActivatedRoute);



  ngOnInit(): void {
   
    this.equipmentForm.controls['user'].setValue(this.authService.currentUser()!.uid);
    if(!this.router.url.includes('edit-equipment')) return;
     this.activateRoute.params.
     pipe(
       switchMap(({id})=>this.equipmentService.getEquipmentById(id))
     ).subscribe(equipment=>{
       if(!equipment) return this.router.navigateByUrl('/dashboard/equipments');
       this.equipmentForm.reset(equipment);
       return;
     })
   }
  get currentEquipment():Equipment{
    const report = this.equipmentForm.value as Equipment;
    return report;
  }

  save(){
      if(this.currentEquipment._id){
        this.equipmentService.updateEquipment(this.currentEquipment).subscribe(response=>{
          this.router.navigateByUrl('/dashboard/equipments');
        })
        return;
      }
      this.equipmentService.saveEquipment(this.currentEquipment).subscribe(response=>{
        this.router.navigateByUrl('/dashboard/equipments');
        
      })
    
  }
}
