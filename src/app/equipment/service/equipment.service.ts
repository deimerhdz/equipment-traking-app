import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '../interface/equipment.interface';
import { Observable } from 'rxjs';
import { EquipmentResponse } from '../interface/equipment-reponse';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private readonly url =environment.url;
  private http = inject(HttpClient);

  constructor() { }

  getAllEquipments():Observable<EquipmentResponse>{
    return this.http.get<EquipmentResponse>(`${this.url}/equipments`)
  }
  getEquipmentById(id:string):Observable<Equipment>{
    return this.http.get<Equipment>(`${this.url}/equipments/${id}`)

  }
  saveEquipment(equipment:Equipment):Observable<Equipment>{
    return this.http.post<Equipment>(`${this.url}/equipments`,equipment)
  }
  updateEquipment(equipment:Equipment):Observable<Equipment>{
    return this.http.put<Equipment>(`${this.url}/equipments/${equipment._id}`,equipment)
  }
  deleteEquipmentById(id:string){
    return this.http.delete<Equipment>(`${this.url}/equipments/${id}`);
  }

}
