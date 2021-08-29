import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

  interface HtmlInputEvent extends Event{
    target:HTMLInputElement & EventTarget
  }

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  formRegister:FormGroup;
  idProduct:string;
  product:Product
  uploadedFiles: string | ArrayBuffer ;
  image:string
  file:File

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

      const productData = new FormData();
      productData.append('image',this.file)
      productData.append('nombre',this.formRegister.value.nombre)
      productData.append('descripcion',this.formRegister.value.descripcion)
      productData.append('categoria',this.formRegister.value.categoria)
      productData.append('precio',this.formRegister.value.precio)
      

      // const productData = {
      //   nombre: this.formRegister.value.nombre,
      //   descripcion : this.formRegister.value.descripcion,
      //   categoria: this.formRegister.value.categoria,
      //   precio: ,
      // } 
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

  photoSelected(event:HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      // preview
      const reader = new FileReader();
      reader.onload = e => this.uploadedFiles = reader.result;
      reader.readAsDataURL(this.file)
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
