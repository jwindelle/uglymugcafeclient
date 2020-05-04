import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { SignalViewModel } from '../models/signal-view-model';
import { User } from '../models/user';
import { Configs } from '../constants/Configs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<User[]>();

  constructor(private http: HttpClient) {
    this.buildConnection();
    this.startConnection();
  }

  public buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(Configs.URL_SIGNALHUB)
      .build();
  };

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(()=>{
        console.log("Connection Started...");
        this.registerSignalEvents();
      })
      .catch(err=>{
        console.log("Error while starting connection: " + err);
        setTimeout(function(){
          this.startConnection();
        }, 3000);
      });
  }

  public getAllUsers(): Observable<User>
  {
    return this.http.get<User>(Configs.URL_SIGNALR_GET, httpOptions);
  }

  public addUser(user:User): Observable<User>
  {
    return this.http.post<User>(Configs.URL_SIGNALR_POST, user, httpOptions);
  }

  public updateUser(user: User): Observable<User>{
    return this.http.put<User>(Configs.URL_SIGNALR_PUT+'/'+user.id, user, httpOptions);
  }

  public deleteUser(id:number): Observable<User>{
    return this.http.delete<User>(Configs.URL_SIGNALR_DELETE+'/'+id, httpOptions);
  }

  private registerSignalEvents(){
    // this.hubConnection.on("SignalMessageReceived", (data: SignalViewModel)=>{
    //   this.signalReceived.emit(data);
    // })
    // FIXME:
    // be more strict with data types
    this.hubConnection.on("SignalMessageReceived", resp=>{
      this.signalReceived.emit(resp.value);
    })
  }
}
