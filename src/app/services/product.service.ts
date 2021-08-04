import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductResponse } from '../models/product-response';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product:ProductResponse;

  constructor(
    private http:HttpClient

  ) { }

  getAllProducts() {
    return this.http.get<Product>('http://localhost:3000/api/productos');
  }

  getProduct(label:any) {
    return this.http.get<Product>(`http://localhost:3000/api/productos/${label}`);
  }
}
