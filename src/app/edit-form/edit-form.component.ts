import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  formUpdate:FormGroup;
  idProduct:string;
  product:Product

  constructor(
    private formBuilder:FormBuilder,
    private productService: ProductService,
    private router:ActivatedRoute,
    private route: Router
  ) { 
    this.buildForm();
    this.idProduct = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProduct();
  }

  onSave(){

    console.log(this.formUpdate.value)

    if(this.formUpdate.valid){
      const productData = {
        nombre: this.formUpdate.value.nombre,
        descripcion : this.formUpdate.value.descripcion,
        categoria: this.formUpdate.value.categoria,
        precio: this.formUpdate.value.precio,
      } 
      this.productService.updateProduct(this.idProduct,productData).subscribe( response => {
        console.log('response registro',response)
        if(response){
          this.formUpdate.reset();
          this.route.navigateByUrl('/products')
        }else{
          alert('Error, ingrese los datos denuevo')
        }
      })
    }else{

      console.log('in-valido')
    }

  }

  getProduct(){
    this.productService.getProduct(this.idProduct).subscribe( product =>{
      // this.product = product
      this.formUpdate.patchValue(product)
    } )
  }

  private buildForm(){
    this.formUpdate = this.formBuilder.group({
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      precio:['',[Validators.required]],
      categoria:['',[Validators.required]],
    });
  }



}
