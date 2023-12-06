import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService); 
  if(authService.authStatus() == AuthStatus.authenticated){
    router.navigateByUrl('/dashboard')
    return false;
  }  
  return true;
};
