import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../models/usuarios';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable,pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbaService {
  
  tipo:string;
  usuario:any;
  actualiza:Observable<any[]>;
  
  constructor(private http:HttpClient,
    private fireDba:AngularFireDatabase) { }
  
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
  get_tips(){

    /**
     * con el snapshotChanges permito que la aplicacion este 
     * atento a cualquier cambio en la base de datos
     */
    this.actualiza = this.fireDba.list('info_mascotas/tips/').snapshotChanges()
    .pipe(map(valores=>{
      return valores.map(value=>{
        const data = value.payload.val();
        const key = value.payload.key;
        let tip = {
          key:data
        }
        return {key, data};
      });
    }))
    return this.actualiza;
  }
  codigo_policial(){
    this.actualiza = this.fireDba.list('info_mascotas/policial/').snapshotChanges()
    .pipe(map(value=>{
      return value.map(valores=>{
        const data = valores.payload.val();
        const key = valores.payload.key;
        let tip = {
          key:data
        }
      })
    }))
  }

  
}

