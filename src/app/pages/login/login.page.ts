import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { DbaService } from '../../services/dba.service';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;

  constructor(private dba:DbaService,
    private router:Router,
    private fireauth:AngularFireAuth) { }

  ngOnInit() {
  }

  async login(){
    console.log(this.email)
    const result = this.fireauth.auth.signInWithEmailAndPassword(this.email,this.password);
    try{

      if(result){
        this.dba.login(this.email);
      }
      
    }
    catch(err){
      console.log(JSON.stringify(err));
    }
  }

}
