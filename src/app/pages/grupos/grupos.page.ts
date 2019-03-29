import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  /**
   * 
   * Identificador
   * 
   * 161045641500359
   * 
   * secret key facebook
   * 
   * b7ed7ce97a93bb8e414f1290524541b7
   */

  busqueda = {};
  tweets:any[] = [];
  constructor(private http:HttpClient) {
    
    this.busqueda = {
      tema:'@Muy_mascotas'
    }
    
    // HttpParams para ingresar parametro en la busqueda
    this.http.post('https://vetcompany.herokuapp.com/twitter',this.busqueda)
    .subscribe((data:any)=>{
      this.tweets = data.cuerpo.statuses;
    })
      
  }

  ngOnInit() {
  }

  search(event){
    this.busqueda = {
      tema:event.target.value
    }
    this.http.post('https://vetcompany.herokuapp.com/twitter',this.busqueda)
    .subscribe((data:any)=>{
      this.tweets = data.cuerpo.statuses;
    })
  }



}
