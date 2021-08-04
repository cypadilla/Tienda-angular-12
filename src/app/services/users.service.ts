import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userResponse } from '../models/user-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http:HttpClient
  ) { }



  getAllUsers(){
    return this.http.get<userResponse>('http://localhost:3000/api/usuarios');
  }

   updateUser(user,id){
    return this.http.put<userResponse>(`http://localhost:3000/api/usuarios/update/${id}`,user)
  }

  createUser(user){
    return this.http.post<userResponse>(`http://localhost:3000/api/usuarios`,user)
  }

}