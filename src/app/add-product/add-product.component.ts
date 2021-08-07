import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  formRegister:FormGroup;
  idProduct:string;
  product:Product

  constructor(
    private formBuilder:FormBuilder,
    private productService: ProductService,
    private router:ActivatedRoute,
    private route: Router
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  onSave(){

    console.log(this.formRegister.value)

    if(this.formRegister.valid){
      const productData = {
        nombre: this.formRegister.value.nombre,
        descripcion : this.formRegister.value.descripcion,
        categoria: this.formRegister.value.categoria,
        precio: this.formRegister.value.precio,
      } 
      this.productService.createProduct(productData).subscribe( response => {
        console.log('response registro',response)
        if(response){
          this.formRegister.reset();
          this.route.navigateByUrl('/products')
        }else{
          alert('Error, ingrese los datos denuevo')
        }
      })
    }else{

      console.log('in-valido')
    }

  }


  private buildForm(){
    this.formRegister = this.formBuilder.group({
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      precio:['',[Validators.required]],
      categoria:['',[Validators.required]],
    });
  }


}
