import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FacturaResponse } from '../models/factura-response';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  APIURL = `${environment.apiUrl}api`;
  constructor(
    private http:HttpClient
  ) { }

  setBills(data){
    return this.http.post<FacturaResponse>(`${this.APIURL}/facturas/`,data);
  }
}
