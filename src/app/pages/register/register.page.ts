import { Component, OnInit } from '@angular/core';
import { DbaService } from 'src/app/services/dba.service';
import { Veterinaria } from 'src/app/models/usuarios';
import { AlertController } from '@ionic/angular';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker/ngx';

// firebase

import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  type:string;
  services:any[] = [];
  vet = {} as Veterinaria;
  servicios:any[] = [];
  image64:string;
  password:string;
  constructor(private dba:DbaService,
    private alertCtrl:AlertController,
    private image:ImagePicker,
    private fireAuth:AngularFireAuth,
    ) {
    
    this.type = this.dba.getTipo();
    
    this.services = [
      {
        nombre: 'Guarderia',
        img: 'assets/img/home.png'
    },
    {
        nombre: 'Peluqueria',
        img: 'assets/img/tijeras.png'
    },
    {
        nombre: 'Urgencias',
        img: 'assets/img/warning.jpg'
    },
    {
        nombre: 'Veterinaria',
        img: 'assets/img/veterinaria.png'
    },
    {
        nombre: 'Hotel mascotas',
        img: 'assets/img/hotel.png'
    },
    {
        nombre: 'Transporte mascotas',
        img: 'assets/img/warning.jpg'
    }
    ]

  }

  ngOnInit() {
  }
  /**
   * En este metodo se van agregando los usuarios de Veterinaria
   */
  setServices(servicio){
    let pos = this.servicios.indexOf(servicio);
    if (pos == -1){
      // se agrega el servicio
      this.servicios.push(servicio);
    }
    else{
      this.servicios.splice(pos);
      // se elimina el servicio
    }
  }
  async ingresar(){
    
    let alert = await this.alertCtrl.create({
      animated:true,
      header: 'Quiere agregar su imagen',
      buttons:[
        {
          text:'Si',
          role: 'Confirmar',
          handler:()=>{
            this.agregar_user(true)
          }
        },
        {
          text:'No',
          role:'cancelar',
          handler:()=>{
            this.agregar_user(false)
          }
        }
      ]
    })
    alert.present();
  }
  /**
   * Permite seleccionar una imagen del celular
   */
  async agregar_user(is_image){
    if (!is_image){
      if(this.type == 'mascota'){
      
      }
      else {
        this.vet.type = this.type;
        this.vet.services = this.servicios;
        
        try{
          let result = await this.fireAuth.auth
          .createUserWithEmailAndPassword(this.vet.email,this.vet.password)
          if (result){
            this.dba.cargar_user(this.vet);
          }
        }
        catch(err){
          console.log(JSON.stringify(err));
        }

      }
    }
    else {
      let options:ImagePickerOptions = {
        quality: 70,
        outputType: 1, // indica que la imagen va ser en base 64bits
        maximumImagesCount:1
      }
      this.image.getPictures(options).then(img=>{
        for (let x = 0; x < img.length; x++){
          this.image64 = img[x];
        }
      },(err)=>console.log(JSON.stringify(err)));
      
      if (this.type == 'mascota'){
        /**
         * se registran los datos del usuario de tipo
         * normal_user
         */
      }
      else{
        /**
         * se registran los datos del usuario tipo 
         * institute
         */
        this.vet.services = this.servicios;
        this.vet.url = this.image64;
        this.vet.type = this.type;
        try{
          let result = await this.fireAuth.auth
          .createUserWithEmailAndPassword(this.vet.email,this.vet.password)
          if (result){
            this.dba.cargar_user(this.vet);
          }
        }
        catch(err){
          console.log(JSON.stringify(err));
        }
        
  
      }
      


    }
    



  }
  

}
