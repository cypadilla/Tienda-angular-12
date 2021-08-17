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
  uploadedFiles: Array < File > ;
  image:string
  file:any

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
    
    // let formData = new FormData();
    // for (var i = 0; i < this.uploadedFiles.length; i++) {
    //   formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    // }

    // console.log(formData)
    if(this.formRegister.valid){
      const productData = {
        nombre: this.formRegister.value.nombre,
        descripcion : this.formRegister.value.descripcion,
        categoria: this.formRegister.value.categoria,
        precio: this.formRegister.value.precio,
        // imgUrl:this.uploadedFiles,
      } 
      // console.log('imagen', productData.imgUrl)
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

  // onFileChange(event){
  //   // console.log("imagen",event)
  //  const file = event.target.files[0];
  //  if(file.type.includes("image")){
  //    const reader = new FileReader()
  //    reader.readAsDataURL(file);
  //    reader.onload = function load(){
  //      this.image = reader.result;
  //      this.file = file;
  //   }.bind(this)
  //  }
  //   console.log('evento de imagen',event.target.files)
  // }


  private buildForm(){
    this.formRegister = this.formBuilder.group({
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      precio:['',[Validators.required]],
      categoria:['',[Validators.required]],
      // imgUrl:['',[Validators.required]]
    });
  }


}
