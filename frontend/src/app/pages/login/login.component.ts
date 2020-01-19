import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from "../../services/api.service";
import {log} from "util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form;
  error;
  constructor(private apiSevice: ApiService,
              private nav: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
    });
  }

  async onSubmit(data) {
    const login = await this.apiSevice.login(data).toPromise();
    if(login.status === 0){
    this.error = login.msg;
    } else {
      localStorage.setItem("USER",  JSON.stringify(login));
      localStorage.setItem("TOKEN", login.token);
      await this.apiSevice.updateHeaders();
      this.nav.navigate([""]);
    }

  }

  onChange(){
    this.error = null;
  }

}
