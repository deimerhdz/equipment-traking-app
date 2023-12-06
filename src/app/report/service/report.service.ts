import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Report } from '../interfaces/report.interface';
import { ReportReponse } from '../interfaces/report-response.interfacet';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private http = inject(HttpClient);
  private readonly url = environment.url;

  constructor() { }

  getAllReports():Observable<ReportReponse>{
    return this.http.get<ReportReponse>(`${this.url}/reports`)
  }

  getReportById(id:string):Observable<Report>{
    return this.http.get<Report>(`${this.url}/reports/${id}`)
  }

  saveReport(report:Report):Observable<any>{
    return this.http.post<any>(`${this.url}/reports`,report);
  }

  updateReport(report:Report):Observable<Report>{
    return this.http.put<Report>(`${this.url}/reports/${report._id}`,report);
  }
  deleteReportById(id?:string):Observable<any>{
    
    return this.http.delete<any>(`${this.url}/reports/${id}`)
  }
}
