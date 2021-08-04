import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  users : user;
  formRegister:FormGroup;
  constructor(
    private usersService:UsersService,
    private formBuilder:FormBuilder,
    private router:Router,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  onSave(){
    console.log(this.formRegister.value)

    if(this.formRegister.valid){
      console.log('valido')
      const userData = {
        nombre: this.formRegister.value.nombre,
        apellido : this.formRegister.value.apellido,
        direccion: this.formRegister.value.direccion,
        password:this.formRegister.value.password,
        repeat:this.formRegister.value.repeat,
        tipo: this.formRegister.value.tipo,
        email: this.formRegister.value.email,
      } 
      this.usersService.createUser(userData).subscribe( response => {
        console.log('response registro',response)
        if(response){
          this.formRegister.reset();
          this.router.navigateByUrl('/home');
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
      apellido:['',[Validators.required]],
      password:['',[Validators.required]],
      repeat:['',[Validators.required]],
      direccion:['',[Validators.required]],
      tipo:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
    });
  }

}
