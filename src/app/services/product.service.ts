import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductResponse } from '../models/product-response';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  APIURL = `${environment.apiUrl}api`;
  product:ProductResponse;

  constructor(
    private http:HttpClient

  ) { }

  getAllProducts  () {
    return this.http.get<Product>(`${this.APIURL}/productos`);
  }

  getProduct(id:any) {
    return this.http.get<Product>(`${this.APIURL}/productos/${id}`);
  }

  updateProduct(id,product){
    return this.http.put<Product>(`${this.APIURL}/productos/${id}`,product);
  }

  createProduct(product){
    return this.http.post<Product>(`${this.APIURL}/productos`,product,)
  }

  deleteProduct(id){
    return this.http.delete<Product>(`${this.APIURL}/productos/${id}`)
  }


}
