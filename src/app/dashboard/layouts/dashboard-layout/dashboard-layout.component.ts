import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SocketService } from '../../service/socket.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavbarComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent implements OnInit{
 
  private authService = inject(AuthService);
  private sockectService = inject(SocketService);
  public user = computed(()=> this.authService.currentUser())
  private socket:any;

  ngOnInit(): void {
  this.sockectService.notifications$().subscribe(data=>{
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data,
      showConfirmButton: false,
      timer: 1500
    });
  })
  }
  // get user(){
  //   return this.authService.currentUser();
  // }
}
