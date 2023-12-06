import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Report } from '../../interfaces/report.interface';
import { ReportService } from '../../service/report.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.css'
})
export class ReportPageComponent  implements OnInit{
 
  private reportService = inject(ReportService);
  public reports:Report[]=[]
  private router:Router = inject(Router);
  ngOnInit(): void {

    this.listReports();
  }

  listReports(){
    this.reportService.getAllReports().subscribe(data=>{
      this.reports = data.reports;
    })
  }
  editReport(id?:string){
    this.router.navigateByUrl('/dashboard/reports/edit-report/'+id)
  }
  deleteReport(id?:string){
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
       this.reportService.deleteReportById(id).subscribe(response=>{
        console.log(response);       
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        this.listReports();
       })
      }
    });
  }
}
