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

  getProduct(id:any) {
    return this.http.get<Product>(`http://localhost:3000/api/productos/${id}`);
  }

  updateProduct(id,product){
    return this.http.put<Product>(`http://localhost:3000/api/productos/${id}`,product);
  }

  createProduct(product){
    return this.http.post<Product>(`http://localhost:3000/api/productos`,product)
  }

  deleteProduct(id){
    return this.http.delete<Product>(`http://localhost:3000/api/productos/${id}`)
  }


}
