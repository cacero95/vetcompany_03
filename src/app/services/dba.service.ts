import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Veterinaria } from '../models/usuarios';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable,pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DbaService {
  
  tipo:string;
  usuario:any;
  actualiza:Observable<any[]>;
  
  constructor(private http:HttpClient,
    private fireDba:AngularFireDatabase,
    private storage:Storage) { }
  
  login(email){
    let key = email;
        key = key.replace("@","_");
        while(key.indexOf(".") != -1){
          key = key.replace(".","_");
        }
    
    this.actualiza = this.fireDba.list(`${key}`).snapshotChanges()
    .pipe(map(valores=>{
      return valores.map(value=>{

        const data = value.payload.val();
        const key = value.payload.key;
        
        return {key,data};
      });
    }));

    this.actualiza.subscribe(data_user=>{

      let user:any = {};
      console.log(data_user);
      for (let us of data_user){
        switch(us.key){
          case 'apellido':
            user.apellido = us.data;
          break;
          case 'email':
            user.email = us.data;
          break;
          case 'mascotas':
            user.mascotas = us.data;
          break;
          case 'nMascotas':
            user.nMascotas = us.data;
          break;
          case 'name':
            user.name = us.data;
          break;
          case 'type':
            user.type = us.data;
          break;
          case 'telefono':
            user.telefono = us.data;
          break;
          case 'services':
            user.services = us.data;
          break;
          case 'direccion':
            user.direccion = us.data;
          break;
          case 'url':
            user.url = us.data;
          break;

        }
      }
    })
    
  }

  registrar_vet(vet:Veterinaria){

    let key = vet.email
        key = key.replace("@","_");
        while(key.indexOf(".") != -1){
          key = key.replace(".","_");
        }
    
    if(vet.url){
      /**
       * solo si el usuario tiene una imagen que
       * subir al storage
       */
      let promise  = new Promise((resolve,reject)=>{
        /**
         * Hacemos referencia al storage de firebase
         */
       let fireStorage = firebase.storage().ref();
       let file_name = new Date().valueOf().toString();
       fireStorage.child(`img/${file_name}`)
       let upload_task:firebase.storage.UploadTask =
       fireStorage.child(`img/${file_name}`)
       .putString(vet.url,'base64',{contentType: 'image/jpeg'});
       upload_task.on(firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{
          // middle of the upload image
        },
        (err)=>{
          // an error happen
          reject();
        },
        ()=>{
          // success
          /**
              * descargo el url segun el storage de google para guardarselo en la 
              * data base
          */
          fireStorage.child(`img/${file_name}`).getDownloadURL().then(direccion=>{
            vet.url = direccion;
            this.cargar_firebase(vet,key);
            this.setUsuario(vet);
          })
        }
        )
      })  
      
    }
    else{
      this.cargar_firebase(vet,key);
      this.setUsuario(vet); 
    }
    
  }
  registrar_user(usuario:User,is_image){
    let key = usuario.email
        key = key.replace("@","_");
        while(key.indexOf(".") != -1){
          key = key.replace(".","_");
        }

    // console.log(is_image);
    if (is_image){
     let promesa = new Promise ((resolve,reject)=>{
       // recorro el arreglo de mascotas que puede tener el usuario
       for (let x=0; x < usuario.mascotas.length; x++){
        let fireStorage = firebase.storage().ref(); // hacemos la referencia al storage en firebase
        let file_name = new Date().valueOf().toString();
        fireStorage.child(`img/${file_name}`)
        
        let upload_task: firebase.storage.UploadTask =
          fireStorage.child(`img/${file_name}`)
          .putString(usuario.mascotas[x].url, 'base64', {contentType: 'image/jpeg'}); // mando el url de la imagen
          upload_task.on( firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{

          },
          (err)=>{
            reject();
          },
          ()=>{ // exito
            
            let url:string;
            fireStorage.child(`img/${file_name}`).getDownloadURL().then((direction)=>{
              console.log('el url es ' + direction);
              usuario.mascotas[x].url = direction;
              
              
              this.fireDba.object(`${key}/`).update(usuario);

              this.setUsuario(usuario);
            })

            
            
            //upload_task.snapshot.ref.getDownloadURL().then((downloadURL)=> {
              //console.log('File available at', downloadURL);
              
            //});
            
          }
          );
        }
        resolve();
        // aca subire los registros a firebase
        // despues de subir las imagenes al storage
       
     })
    }
    else{
      this.fireDba.object(`${key}/`).update(usuario);
      this.setUsuario(usuario);
    }
  }
  
  cargar_firebase(user, key){
    let usuarios:any [] = [];
      this.fireDba.object(`${key}`).update(user);
      /**
       * con la siguien linea busco los usuarios
       * en el localStorage
       */
      this.storage.get('usuarios').then(values=>{
        usuarios = values;
      });
      /**
       * almaceno el usuario en el localStorage
       */
      this.storage.set('usuarios','usuarios').then(()=>console.log('usuario almacenado!!!'));

  }



  setUsuario(usuario){
    this.usuario = usuario;
  }
  getUsuario(){
    return this.usuario;
  }
  setTipo(tipo){
    this.tipo = tipo;
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
        return {data}
      })
    }));

    return this.actualiza;
  }

  
}

