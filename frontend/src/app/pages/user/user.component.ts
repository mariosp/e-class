import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {SnackBarService} from "../../services/snack-bar.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  topBar;
  userId;
  userData: User;
  profileForm;
  newAccount: boolean;
  edit: boolean;
  constructor(private route:ActivatedRoute,
              private nav: Router,
              private apiService:ApiService,
              private formBuilder: FormBuilder,
              private snackBar: SnackBarService,
              private _location: Location) {
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.newAccount = this.nav.url.includes("new");
    this.edit = this.nav.url.includes("edit");
    this.topBar = {
      title: !this.edit? (this.newAccount? "New Account" : "User Profile") : "Edit Profile",
      buttons: [
        {
          title: !(this.edit || this.newAccount) ? 'Edit': 'Cancel',
          action: !(this.edit || this.newAccount)? ()=> this.editBtn(this.nav) : ()=> this._location.back()
        }
      ]
    };

    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['',[Validators.required, Validators.email]],
      userRole:[null],
      password: ['']
    });
    this.profileForm.controls["userRole"].disable();

    if(this.newAccount) {
      this.profileForm.controls["password"].setValidators(Validators.required);
      this.profileForm.controls["userRole"].setValidators(Validators.required);
      this.profileForm.controls["userRole"].enable();
    } else {
      this.apiService.getUser(this.userId).subscribe(res=>{
        if(res.status){
          this.userData = res.data;

          this.profileForm.patchValue({
            name: this.userData.name,
            email: this.userData.email,
            userRole: this.userData.userRole
          });
          this.edit || this.profileForm.disable();
        }
      });
    }

  }

  disableForm():void{
    this.profileForm.disable();
  }

  enableForm():void{
    this.profileForm.enable();
  }

  createNewUser() {
    const newUser: User = this.profileForm.value;
    this.apiService.createUser(newUser).subscribe(res=>{
      if(res.status){
        console.log(res.msg);
        this.snackBar.messageSuccess(res.msg);
        this.nav.navigate(["/accounts"]);
      }else{
        console.log(res.msg);
      }
    }, error=> this.snackBar.messageSuccess(error.msg))
  }

  editUser() {
    const editUser: User = this.profileForm.value;
    console.log(editUser);
    this.apiService.updateUser(this.userId, editUser).subscribe(res=>{
      if(res.status){
        console.log(res.msg);
        this.snackBar.messageSuccess(res.msg);
        this._location.back();
      }else{
        console.log(res.msg);
      }
    }, error=> this.snackBar.messageSuccess(error.msg))

  }

  private editBtn(nav: Router) {
    this.nav.navigate(["user/edit"]);
  }
}
