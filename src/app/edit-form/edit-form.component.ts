import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

interface HtmlInputEvent extends Event{
  target:HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  formUpdate:FormGroup;
  idProduct:string;
  product:Product
  uploadedFiles: string | ArrayBuffer ;
  photoBack:string | ArrayBuffer;
  image:string
  file:File

  constructor(
    private formBuilder:FormBuilder,
    private productService: ProductService,
    private router:ActivatedRoute,
    private route: Router
  ) { 
    this.buildForm();
    this.idProduct = this.router.snapshot.paramMap.get('id');
    console.log(this.idProduct)
  }

  ngOnInit(): void {
    this.getProduct();
  }

  onSave(){

    console.log(this.formUpdate.value)

    if(this.formUpdate.valid){

      const productData = new FormData();
      if(this.file) {productData.append('image',this.file)}
      productData.append('nombre',this.formUpdate.value.nombre)
      productData.append('descripcion',this.formUpdate.value.descripcion)
      productData.append('categoria',this.formUpdate.value.categoria)
      productData.append('precio',this.formUpdate.value.precio)
      

      console.log('productdata',productData)
      // const productData = {
      //   nombre: this.formUpdate.value.nombre,
      //   descripcion : this.formUpdate.value.descripcion,
      //   categoria: this.formUpdate.value.categoria,
      //   precio: this.formUpdate.value.precio,
      // } 


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

  photoSelected(event:HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      // preview
      const reader = new FileReader();
      reader.onload = e => this.uploadedFiles = reader.result;
      reader.readAsDataURL(this.file)
    }
  }

  getProduct(){
    this.productService.getProduct(this.idProduct).subscribe( product =>{
      // this.product = product
      this.formUpdate.patchValue(product)
      if(product.imgUrl){
        this.photoBack = 'http://localhost:3000/' + product.imgUrl
      }
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
