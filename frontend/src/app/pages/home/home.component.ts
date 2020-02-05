import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {Location} from "@angular/common";

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
  constructor(private nav: Router,
              private apiService: ApiService,
              private location: Location) { }

 async ngOnInit() {
    this.user = JSON.parse(await localStorage.getItem("USER"));
    switch (this.user.userRole) {
      case "admin":
        this.nav.navigate(["/accounts"]);
        break;
      case "teacher":
        this.nav.navigate(["/my-lesson"]);
        break;
      case "student":
        this.nav.navigate(["/my-courses"]);
        break;
    }
  }

  async logout(){
    await this.apiService.logout().subscribe();
    localStorage.removeItem("USER");
    localStorage.removeItem("TOKEN");
    this.nav.navigate(['/login']);

  }
}
