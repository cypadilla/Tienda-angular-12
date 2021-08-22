import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  label:string
  product:Product;
  permisos:any;
  
  constructor(
    private productService :ProductService,
    private userService:UsersService,
    private router: ActivatedRoute,
    private route:Router
  ) { 
    this.label = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProduct();
    this.getPermissions();
  }

  getProduct() {
    this.productService.getProduct(this.label).subscribe((product:Product) => {
      this.product = product
      console.log('hola',this.product)
    });
  }

  goEdit(id){
    this.route.navigateByUrl(`/product/edit/${id}`)
  }

  goDelete(id){
    this.productService.deleteProduct(id).subscribe( res => {
      this.route.navigateByUrl('/products')
    })
  }

  getPermissions(){
    this.userService.getPermissions().subscribe( response => {
      this.permisos = response[0].permisos
      console.log('permisos',this.permisos)
    })
  }
}
