import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl= 'https://1gtvc2c2-3000.brs.devtunnels.ms'
  private JSONServer = 'http://localhost:3000'
  

  constructor(private http:HttpClient) { }

  registerClient(cliente: Client): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/auth/register`,cliente);
  }
  loginCLient(emailClient:string,passwordClient:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`,{email:emailClient,password:passwordClient})
  }
  validateEmail(token:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/auth/validate-email/${token}`);
  }
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/category`);/*
    return this.http.get<any>(`${this.JSONServer}/categories`);*/ 
  }
  getProducts(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/product/`);
  }
  getProductsPagination(page:number,category:string,orderBy:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/product/?page=${page}&limit=10&orderBy=${orderBy}`);
  }
  getProductsByCategory(page:number,category:string,orderBy:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/product/category/${category}?page:${page}&limit=10&orderBy=${orderBy}`);
  }
  getProductsBySubCategory(page:number,subcategory:string,orderBy:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/product/sub-category/${subcategory}?page:${page}&limit=10&orderBy=${orderBy}`);
  }
  getProductByID(): Observable<any>{
    return this.http.get<any>(`${this.JSONServer}/products`);
  }
  getProductBySearch(search:string,page:number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/product/word/${search}?page=${page}&limit=10`);
  }

}
