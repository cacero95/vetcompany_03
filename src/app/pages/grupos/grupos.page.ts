import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  constructor(private http:HttpClient) {
    this.http.get('https://vetcompany.herokuapp.com/twitter').subscribe(data=>{
      console.log(data);
    })  
  }

  ngOnInit() {
  }

}
