import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { LoginResponse } from '../interfaces/login-response';
import { ChackTokenResponse } from '../interfaces/check-token.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.url;
  private http = inject(HttpClient);
  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(()=>this._currentUser());
  public authStatus = computed(()=>this._authStatus());

  constructor() { 
    this.checkAuthStatus().subscribe()
  }
  private setAthentication(user:User,jwt:string):boolean{
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    if(typeof window !== 'undefined'){ 
    localStorage.setItem('token',jwt);
    }
    return true;
  }
  login(email:string,password:string):Observable<boolean>{
    const url = `${this.url}/auth/login`;
    const body = {email,password};

    return this.http.post<LoginResponse>(url,body)
    .pipe(
      map(({user,jwt})=>this.setAthentication(user,jwt)),
      catchError(err=>throwError(()=>err.error.mgs))
    );
  }

  checkAuthStatus():Observable<boolean>{
    const url =`${this.url}/auth/renew`;
    let token:string='';
    if(typeof window !== 'undefined'){ 
     token = localStorage.getItem('token')|| '';
    }
    if(!token){
      this.logout();
      return of(false)};
    const headers = new HttpHeaders().set('token',`${token}`);

    return this.http.get<ChackTokenResponse>(url,{headers})
    .pipe(
      map(({user,jwt})=>this.setAthentication(user,jwt)),
      catchError(()=>of(false))
    )
  }

  logout(){
    if(typeof window !== 'undefined'){ 
     localStorage.removeItem('token');
     this._authStatus.set(AuthStatus.notAuthenticated)
     this._currentUser.set(null);
     }
  }
}
