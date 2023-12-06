import { Component, OnInit, inject } from '@angular/core';
import { Equipment } from '../../../equipment/interface/equipment.interface';
import { EquipmentService } from '../../../equipment/service/equipment.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { ReportService } from '../../service/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../../../dashboard/service/socket.service';
import { switchMap } from 'rxjs';
import { Report } from '../../interfaces/report.interface';


@Component({
  selector: 'app-add-report-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-report-page.component.html',
  styleUrl: './add-report-page.component.css'
})
export class AddReportPageComponent implements OnInit {

  public equipments:Equipment[] = []
  private equipmentService = inject(EquipmentService);
  private fb:FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private reportService =  inject(ReportService);
  private router = inject(Router);
  private activateRoute:ActivatedRoute = inject(ActivatedRoute);
  private socketService =inject(SocketService)
  public reportForm:FormGroup = this.fb.group({
    _id:[''],
    description:['',Validators.required],
    equipmentId:['',Validators.required],
    userId:['',Validators.required]

  })


  ngOnInit(): void {
   this.getEquipments();
   this.reportForm.controls['userId'].setValue(this.authService.currentUser()!.uid);
   if(!this.router.url.includes('edit-report')) return;
    this.activateRoute.params.
    pipe(
      switchMap(({id})=>this.reportService.getReportById(id))
    ).subscribe(report=>{
      if(!report) return this.router.navigateByUrl('/dashboard/reports');
      this.reportForm.reset(report);
      return;
    })
  }

  getEquipments(){
    this.equipmentService.getAllEquipments().subscribe(data=>{
      this.equipments=data.equipments;
    })
  }
  get currentReport():Report{
    const report = this.reportForm.value as Report;
    return report;
  }
  save(){
    if(this.currentReport._id){
      this.reportService.updateReport(this.currentReport).subscribe(response=>{
        this.router.navigateByUrl('/dashboard/reports');
      })
      return;
    }
    this.reportService.saveReport(this.currentReport).subscribe(response=>{
      
      this.socketService.sendNotification$('Se ha creado un nuevo reporte con id '+response.report._id);
      this.router.navigateByUrl('/dashboard/reports');
      
    })
  }



}
