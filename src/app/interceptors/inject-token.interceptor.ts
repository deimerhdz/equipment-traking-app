import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class InjectTokenInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try{
            let token = '';
            if(typeof window !== 'undefined'){ 
            token = localStorage.getItem('token') || '';
            }
            let newRequest = req;
            console.log('interceptor');
            
            newRequest = req.clone({
              setHeaders:{
                token:`${token}`
              }
            })
            return next.handle(newRequest);
      
          }catch(e){
            console.log('err',e);
            return next.handle(req);
          }
    }

}