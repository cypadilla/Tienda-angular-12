import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { FacturaService } from '../services/factura.service';
import { ProductService } from '../services/product.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  idProduct:string
  product:Product
  user:any
  constructor(
    private router:ActivatedRoute,
    private productService :ProductService,
    private usersService :UsersService,
    private facturaService: FacturaService
  ) { 
    this.idProduct = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProduct();
    this.getUser();
    console.log(localStorage.getItem('tipo'))
  }

  getUser() {
    const id = localStorage.getItem('id')
    console.log(id)
    this.usersService.getUser(id).subscribe( res => {
      this.user = res
      console.log('usuario',this.user[0].direccion)
    })
  }

  getProduct() {
    this.productService.getProduct(this.idProduct).subscribe((product:Product) => {
      this.product = product
      console.log('hola',this.product)
    });
  }

  setFactura(){ 

    const data = {
      nombreProducto : this.product.nombre,
      valor:this.product.precio,
      idUsuario:this.user[0]._id
    }

    this.facturaService.setBills(data).subscribe((response)=>{
      console.log('respuesta facutura',response)
    })
  }

}
