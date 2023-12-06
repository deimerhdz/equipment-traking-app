import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router:Router = inject(Router);
  public loginForm:FormGroup = this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })


  login():void{
    const {email,password}=this.loginForm.value;
    console.log();
    this.authService.login(email,password).subscribe({
      next:()=>this.router.navigateByUrl('/dashboard/equipments'),
      error:(message)=>{
        Swal.fire('Error',message,'error')
      }
    })
  }
}
