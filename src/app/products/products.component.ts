import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductService } from '../services/product.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  APIURL = `${environment.apiUrl}`;
  products:any
  tipo:string
  permisos:any

  constructor(
    private router:Router,
    private productService:ProductService,
    private userService:UsersService
  ) { }

  ngOnInit(){
    this.getAllProducts();
    this.getType();
    this.getPermissions();
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe( res =>{
      this.products = res;
      console.log(this.products)
    })
  }
  
  getPermissions(){
  this.userService.getPermissions().subscribe( response => {
    this.permisos = response[0].permisos
    console.log('permisos',this.permisos)
  })
  }

  goProduct(label:any) {
    console.log('id',label)
    this.router.navigate(['product/' + label]);
  }

  goBuy(id){
    this.router.navigate(['buy/'+id])
  }

  getType(){
    let tipoDeUsuario = this.userService.getType();
    this.tipo = tipoDeUsuario
  } 

  


}
