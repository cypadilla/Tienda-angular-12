import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products:any
  constructor(
    private router:Router,
    private productService:ProductService
  ) { }

  ngOnInit(){
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe( res =>{
      this.products = res;
      console.log(this.products)
    })
  }

  goProduct(label:any) {
    console.log('id',label)
    this.router.navigate(['product/' + label]);
  }



}
