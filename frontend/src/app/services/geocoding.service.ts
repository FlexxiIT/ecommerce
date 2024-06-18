import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private apiUrl = `https://api.zippopotam.us/us/`

  constructor(private http: HttpClient) {}

  getLocation(postalCode : string){
    return this.http.get(`${this.apiUrl}${postalCode}`)
  }
}
