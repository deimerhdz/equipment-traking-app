import { Injectable, inject } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const urlsockect = environment.urlsocket;
let token:any;
if(typeof window !== 'undefined'){ 
  token = localStorage.getItem('token')|| '';
 }
@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket{

  
  constructor() {
    super({ url: urlsockect, options: {
      extraHeaders: {
        "token": token
      }
    }
   });
  }
  public sendNotification$(message:string){
  
        this.ioSocket.emit('send-notification', message);
     
  }
  public notifications$(): Observable<any> {
    return new Observable(observer => {
      try {

        this.ioSocket.on('connect', () => { //TODO Nativo!
          console.log('Conectado!');
        })

        this.ioSocket.on('receive-notification', (data:any) => { //TODO Nuestro evento!!
          observer.next(data)

        })

        this.ioSocket.on('disconnect', () => { //TODO Nativo!
          observer.complete()
        })

        this.ioSocket.on('error', (e:any) => { //TODO Nativo!
          observer.error(e)
        })


        this.ioSocket.on('connect_error', (e:any) => { //TODO Nativo!
          observer.error(e)
        })


      } catch (e) {
        observer.error(e);
      }
    })
  }
}
