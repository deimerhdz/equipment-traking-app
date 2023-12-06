import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
 {
  path:'',
  component:AuthLayoutComponent,
  children:[
    {path:'login',component:LoginPageComponent},
    {path:'**',redirectTo:'login'}
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
