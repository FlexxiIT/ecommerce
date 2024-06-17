import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token: string = '';
  private apiUrl: string= 'https://1gtvc2c2-3000.brs.devtunnels.ms';

  constructor(private http: HttpClient) {
    const isToken = localStorage.getItem('token');
    if(isToken !== null){
      this.token = isToken;
    }
  }

  getCart(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/cart/`);
  }
  addItemtoCart(itemDetails:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/cart/item`, itemDetails);
  }
  deleteItemtoCart(itemDetails:any): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/api/cart`, itemDetails);
  }
  updateQuantity(itemDetails:any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/api/cart`, itemDetails);
  }


  getHeaders(){
    const tokenAsString = String(this.token); // Convertir a string si es necesario

    const headers = new HttpHeaders({
      'authorization': tokenAsString  // Asegurarse de que el token sea de tipo string
    })

    const requestOptions = {
      headers: headers
    };

    return requestOptions;
  }
}
