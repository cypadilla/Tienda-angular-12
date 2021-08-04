import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  label:string
  product:Product;

  constructor(
    private productService :ProductService,
    private router: ActivatedRoute
  ) { 
    this.label = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct(this.label).subscribe((product:Product) => {
      this.product = product
      console.log('hola',this.product)
    });
  }
}
