import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userResponse } from '../models/user-response'
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users : userResponse;
  formUpdate:FormGroup;
  idUser:string;
  tipo:string;

  constructor(
    private usersService:UsersService,
    private formBuilder:FormBuilder,
    private router: Router
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.getType()
    if(this.tipo === 'administrador'){
      this.getAllUsers();
    }else{
      this.getUser();
    }
  }
  getUser() {
    const id = localStorage.getItem('id')
    console.log(id)
    this.usersService.getUser(id).subscribe( res => {
      this.users = res
    })
  }

  getAllUsers(){
    this.usersService.getAllUsers().subscribe( res =>{
      this.users = res;
      console.log('usuarios',this.users)
    })
  }

  edit(item){
    this.formUpdate.patchValue(item)
    this.idUser = item._id;
    console.log(this.idUser)
  }

  getType(){
    this.tipo = this.usersService.getType();
  }

  onSave(){

    console.log(this.formUpdate.value)

    if(this.formUpdate.valid){
      // const permisos = this.permisos();
      console.log('valido')
      const userData = {
        nombre: this.formUpdate.value.nombre,
        apellido : this.formUpdate.value.apellido,
        direccion: this.formUpdate.value.direccion,
        tipo: this.formUpdate.value.tipo,
        email: this.formUpdate.value.email,
        permisos:{
          add: this.formUpdate.value.permisoAgregar,
          put:this.formUpdate.value.permisoEditar,
          delete:this.formUpdate.value.permisoEliminar
        }
        // permisos:permisos
      } 
      console.log('id:',this.idUser);
      console.log('id:',userData);

      this.usersService.updateUser(userData,this.idUser).subscribe( response => {
        console.log('response registro',response)
        if(response){
          this.formUpdate.reset();
          if(this.tipo === 'administrador'){
            this.getAllUsers();
          }else{
            this.getUser();
          }
        }else{
          alert('Error, ingrese los datos denuevo')
        }
      })
    }else{

      console.log('in-valido')
    }
  }
  permisos() {
     
    interface permisos {
        add,
        put,
        delete,
    }

    let permisos :permisos

    if(this.formUpdate.value.permisoAgregar!= null){
      permisos.add = this.formUpdate.value.permisoAgregar
    }else{
      permisos.add = false
    }

    if(this.formUpdate.value.permisoEditar!= null){
      permisos.put = this.formUpdate.value.permisoEditar
    }else{
      permisos.put = false
    }

    if(this.formUpdate.value.permisoEliminar!= null){
      permisos.delete = this.formUpdate.value.permisoEliminar
    }else{
      permisos.delete = false
    }

    return permisos

  }


  private buildForm(){
    this.formUpdate = this.formBuilder.group({
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      direccion:['',[Validators.required]],
      tipo:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      permisoAgregar:[''],
      permisoEditar:[''],
      permisoEliminar:['']
    });
  }

  

}
