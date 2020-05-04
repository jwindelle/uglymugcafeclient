import { Component, OnInit } from '@angular/core';
import { UserTypes } from './constants/UserTypes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  userTypes=UserTypes;
  userType=UserTypes.NONE;

  constructor(){}

  ngOnInit(){

  }

  setUserAsClient(){
    this.userType=UserTypes.CLIENT;
  }

  setUserAsBarista(){
    this.userType=UserTypes.BARISTA;
  }

}