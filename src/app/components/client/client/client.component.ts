import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { User } from '../../../models/user';
import { SignalRService } from '../../../services/signal-r.service';
import { SignalViewModel } from '../../../../app/models/signal-view-model';
import { Const } from 'src/app/constants/Const';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ ProductsService, SignalRService ]
})
export class ClientComponent implements OnInit 
{
  // signalList: SignalViewModel[] = [];
  signalList: User[] = [];

  hasOrdered=false;
  userName=null;
  user:User;
  users;
  products;

  isUserInitialized=false;
  
  // using separate arrays for storing index of selected produccts
  // and another one for storing names of selected products
  // because I had encountered a bug with the html renderer
  // that doesn't update at once when calling a function from it
  orderIds:Array<number>= new Array<number>();
  orders:Array<string>= new Array<string>();

  constructor
  (
    private productsService: ProductsService,
    private signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    while(this.userName===null || this.userName==="")
    {
      this.userName = prompt(Const.MSG_WHATISYOURNAME);
    }
    this.getProducts();

    // for single user only
    // this.signalRService.signalReceived.subscribe((signal:SignalViewModel)=>{
    //   this.signalList.push(signal);
    // })

    // this.signalRService.signalReceived.subscribe(resp=>{
      
    //   this.signalList = resp;
    // })
  }

  registerSignalListener()
  {
    this.signalRService.signalReceived.subscribe(resp=>{
      this.signalList = resp;

      this.signalList = this.signalList.reverse();

      if(this.signalList.length>0)
      {
        this.signalList.forEach(elem=>{

          setTimeout(()=>{
            if(elem.id===this.user.id)
            {
              console.warn("match");
              if(elem.status===Const.USR_STATUS_PICKUP){
                alert(Const.MSG_ORDERFORPICKUP);
                this.user.status=Const.USR_STATUS_PICKUP;
              }else if(elem.status===Const.USR_STATUS_CANCELLED){
                this.cancelOrder();
              }else if(elem.status===Const.USR_STATUS_PROCESSING){
                if(this.user.status!==Const.USR_STATUS_PROCESSING){
                  alert(Const.MSG_ORDERPROCESSED);
                }
                this.user.status=Const.USR_STATUS_PROCESSING;
              }
            }
          },1500);
          
        })
      }
      else
      {
        this.cancelOrder();
      }
    })
  }

  getProducts():void{
    this.productsService.getProducts()
      .subscribe(resp=>{
        this.products = resp;
      });
  }

  getProductNameById(index:number):string
  {
    return this.products[index];
  }

  onCheckboxChanged(index, evt)
  {
    if(this.orderIds.indexOf(index)<=-1)
    {
      this.orderIds.push(index);
    }
    else
    {
      if(this.orderIds.length==1)
        this.orderIds=new Array<number>();
      else
        this.orderIds.splice(index,1);
    }
  }

  order(){
    if(this.orderIds.length<=0)
    {
      alert(Const.MSG_PLSCHOOSEAPRODUCT);
      return;
    }

    this.orderIds.forEach(orderId=>{
      console.log(this.getProductNameById(orderId));
      this.orders.push(this.getProductNameById(orderId));
    })
    this.hasOrdered=true;

    var user:User = new User();
      user.name = this.userName.trim();
      user.type = Const.USR_TYPE_CLIENT;
      user.orders = this.orders.join();
      user.status = Const.USR_STATUS_QUEUE;

    this.registerSignalListener();
    this.signalRService.addUser(user)
      .subscribe(user=>{
        this.user=user;
        this.isUserInitialized=true;
      });
  }

  cancelOrder(){
    this.orderIds=new Array<number>();
    this.orders=new Array<string>();
    this.hasOrdered=false;
    this.isUserInitialized=false;
    this.user.status="";
    this.signalRService.deleteUser(this.user.id)
    .subscribe(user=>{
      // this.user=user;
    });
  }

  isVisibileForUser(user:User):Boolean
  {
    let canBeShown=true;

    if(this.user.id===user.id)
    {
      if(user.status===Const.USR_STATUS_PICKUP)
        canBeShown=false;
    }
    else{
      canBeShown=false;
    }

    return canBeShown;
  }

  isPickupButtonVisible(user:User):Boolean
  {
    let canBeShown=false;

    if(this.user.id===user.id)
    {
      if(user.status===Const.USR_STATUS_PICKUP)
        canBeShown=true;
    }
    else{
      canBeShown=false;
    }

    return canBeShown;
  }

}