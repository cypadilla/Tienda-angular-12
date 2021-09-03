import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginResponse } from '../models/login-response';
import { userResponse } from '../models/user-response';
import { environment } from '../../environments/environment' 


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  APIURL = `${environment.apiUrl}api`;

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
    
    return this.http.get<userResponse>(`${this.APIURL}/usuarios/${id}`);
  }

  getUser(id){
    return this.http.get<userResponse>(`${this.APIURL}/usuarios/${id}`);
  }

  getAllUsers(){
    const token = localStorage.getItem('token');

  
    let header = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
      })
      return this.http.get<userResponse>(`${this.APIURL}/usuarios`,{headers:header});
  };


  updateUser(user,id){
    return this.http.put<userResponse>(`${this.APIURL}/usuarios/update/${id}`,user)
  }

  createUser(user){
    return this.http.post<userResponse>(`${this.APIURL}/usuarios`,user);
  }

  login(userData){
    console.log(this.APIURL)
    return this.http.post<loginResponse>(`${this.APIURL}/auth`,userData);
  }

  deleteUser(id){
    return this.http.delete<userResponse>(`${this.APIURL}/usuarios/${id}`)
  }

}