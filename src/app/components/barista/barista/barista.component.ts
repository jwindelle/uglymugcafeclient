import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { SignalRService } from '../../../services/signal-r.service';
import { Const } from 'src/app/constants/Const';


@Component({
  selector: 'app-barista',
  templateUrl: './barista.component.html',
  styleUrls: ['./barista.component.css'],
  providers: [ SignalRService ]
})
export class BaristaComponent implements OnInit 
{
  signalList: User[] = [];
  users;

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.signalReceived.subscribe(resp=>{
      this.signalList = resp;
      this.signalList = this.signalList.reverse();
    })

    setTimeout(()=>{
      this.signalRService.getAllUsers()
        .subscribe(users=>{ this.users=users })
    },1500)
  }

  processUserOrder(user:User)
  {
    switch(user.status)
    {
      default:
      case Const.USR_STATUS_QUEUE:
      {
        user.status=Const.USR_STATUS_PROCESSING;
        break;
      }
      case Const.USR_STATUS_PROCESSING:
      {
        user.status=Const.USR_STATUS_PICKUP;
        break;
      }
    }

    this.signalRService.updateUser(user)
    .subscribe(user=>{
      // this.user=user;
    });
  }

  cancelUserOrder(user:User)
  {
    user.status=Const.USR_STATUS_CANCELLED;

    this.signalRService.updateUser(user)
    .subscribe(user=>{
      // this.user=user;
    });
  }

  /**
   * This is to be used for debug purpose only
   */
  deleteUser(id:number)
  {
    this.signalRService.deleteUser(id)
    .subscribe(user=>{
      // this.user=user;
    });
  }

  isVisibileByStatus(status:string):Boolean
  {
    let canBeShown=true;

    if(status===Const.USR_STATUS_PICKUP)
      canBeShown=false;

    return canBeShown;
  }

}
