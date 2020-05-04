import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { Configs } from '../constants/Configs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService 
{
  constructor(private http: HttpClient) {}

  getProducts(){
    return this.http.get(Configs.URL_API_PRODUCTS);
  }
}
