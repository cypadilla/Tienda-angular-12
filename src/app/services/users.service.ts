import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginResponse } from '../models/login-response';
import { userResponse } from '../models/user-response';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http:HttpClient
  ) { }


  getToken(){
    return localStorage.getItem('token');
  }

  getType(){
    return localStorage.getItem('tipo');
  }

  getPermissions(){
    let id = localStorage.getItem('id')
    
    return this.http.get<userResponse>(`http://localhost:3000/api/usuarios/${id}`);
  }

  getUser(id){
    return this.http.get<userResponse>(`http://localhost:3000/api/usuarios/${id}`);
  }

  getAllUsers(){
    const token = localStorage.getItem('token');

  
    let header = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
      })
      return this.http.get<userResponse>('http://localhost:3000/api/usuarios',{headers:header});
  };


  updateUser(user,id){
    return this.http.put<userResponse>(`http://localhost:3000/api/usuarios/update/${id}`,user)
  }

  createUser(user){
    return this.http.post<userResponse>(`http://localhost:3000/api/usuarios`,user);
  }

  login(userData){
    return this.http.post<loginResponse>(`http://localhost:3000/api/auth`,userData);
  }

  deleteUser(id){
    return this.http.delete<userResponse>(`http://localhost:3000/api/usuarios/${id}`)
  }

}