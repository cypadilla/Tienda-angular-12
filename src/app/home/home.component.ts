import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tipo:string;
  constructor(
    private router:Router,
    private userService:UsersService
  ) { }

  ngOnInit(): void {
    this.getType()
    this.getPermissions()
  }
  getPermissions() {
    this.userService.getPermissions()
  }

  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('tipo')
    this.router.navigateByUrl('login')
  }

  getType(){
    this.tipo = this.userService.getType();
  }




}
