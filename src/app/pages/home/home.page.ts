import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/usuarios';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user:User;
  usuarios:User[] = [];
  constructor(private router:Router,
    private storage:Storage) {
      this.storage.get('usuarios').then(values=>{
        this.usuarios = values;
      });
      console.log(this.usuarios);
      if(this.usuarios){
        this.user = this.usuarios[0];
      }
      

    }

  ngOnInit() {
  }

  explorar(place:string){
    this.router.navigate([`/${place}`]);
  }

}
