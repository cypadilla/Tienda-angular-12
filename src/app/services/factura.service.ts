import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacturaResponse } from '../models/factura-response';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(
    private http:HttpClient
  ) { }

  setBills(data){
    return this.http.post<FacturaResponse>(`http://localhost:3000/api/facturas/`,data);
  }
}
