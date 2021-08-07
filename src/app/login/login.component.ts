import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup;

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
    console.log(this.formLogin.value)

    if(this.formLogin.valid){
      console.log('valido')
      const userData = {
        password:this.formLogin.value.password,
        email: this.formLogin.value.email,
      } 
      this.usersService.login(userData).subscribe( response => {
        console.log('response registro',response)
        if(response){
          console.log('token',response.jwtToken)
          localStorage.setItem('token',response.jwtToken)
          this.formLogin.reset();
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
    this.formLogin = this.formBuilder.group({
      password:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
    });
  }

}

