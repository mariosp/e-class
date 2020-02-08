import { Component, OnInit } from '@angular/core';
import {ButtonItem, TopBar} from "../../../models/top-bar";
import {ApiService} from "../../../services/api.service";
import {List} from "../../../models/list";
import {User} from "../../../models/user";
import {DialogComponent} from "../../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SnackBarService} from "../../../services/snack-bar.service";


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  topBar: TopBar;
  list: List;
  listButtons: ButtonItem[];
  constructor(private apiService: ApiService,
              private dialog: MatDialog,
              private nav: Router,
              private snackBar: SnackBarService) { }

  ngOnInit() {
    this.topBar={
      title: "Accounts",
      buttons: [
        {
          title: 'New User',
          action: ()=>this.newUser(this.nav)
        }
      ]
    };

    this.listButtons = [
      {
        title: "edit",
        action:(userId)=> this.editUser(this.nav, userId)
      },
      {
        title: "delete",
        action: (userId)=> this.deleteUser(this.dialog, userId)
      }
    ];

    this.apiService.getAllUsers().subscribe((res)=>{
      console.log(res)
      res.status? (this.list = {data: res.data, buttons: this.listButtons}) : new Error(res.msg);
    })

  }

  newUser(nav) {
    console.log("test");
    nav.navigate([`/user/new`]);
  }

  editUser(nav, userId){
    console.log("edit"+ userId)
    nav.navigate([`/user/${userId}/edit`]);
  }

  deleteUser(dialog, userId){
    const dialogType = "NotifyDialog";
    const msg = "Are you sure you want to delete the user?";
    const dialogRef = dialog.open(DialogComponent, {
      data: {
        dialogType,
        msg
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return;
      this.apiService.deleteUser(userId).subscribe(res=>{
        if(res.status) {
          this.snackBar.messageSuccess(res.msg);
          this.ngOnInit();
        }else {
          this.snackBar.messageSuccess(res.msg);
          this.ngOnInit();
        }
      })
    });
  }

}
