import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class DbaService {
  
  tipo:string;
  usuario:any
  constructor(private http:HttpClient) { }
  
  setUsuario(usuario){
    this.usuario = usuario;
  }
  getUsuario(){
    return this.usuario;
  }
  setTipo(tipo){
    this.tipo=tipo;
  }
  getTipo(){
    return this.tipo;
  }
  cargar_user(user_info){
    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded'
    });
    let user = user_info;
    user.type = 'institute';
    console.log(user);
    this.http.post('https://vetcompany.herokuapp.com/cargar',user)
    .subscribe(data=>console.log(data));

  }
}
