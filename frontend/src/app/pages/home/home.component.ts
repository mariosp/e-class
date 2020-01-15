import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user = {
    name : '',
    userRole: undefined
  };
  constructor(private nav: Router,private apiService: ApiService) { }

 async ngOnInit() {
    this.user = JSON.parse(await localStorage.getItem("USER"));
  }

  async logout(){
    await this.apiService.logout().subscribe();
    localStorage.removeItem("USER");
    localStorage.removeItem("TOKEN");
    this.nav.navigate(['/login']);

  }

}
