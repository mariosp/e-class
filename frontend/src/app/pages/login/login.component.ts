import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form;
  error
  constructor(private apiSevice: ApiService,) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
    });
  }

  async onSubmit(data) {
    console.log(data)
    const login = await this.apiSevice.login(data).toPromise();
    if(login.status === 1){
    console.log(login.msg)
    } else {
      this.error = login.msg;
    }
  }

}
