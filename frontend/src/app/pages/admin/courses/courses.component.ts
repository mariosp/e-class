import { Component, OnInit } from '@angular/core';
import {ButtonItem, TopBar} from "../../../models/top-bar";
import {List} from "../../../models/list";
import {ApiService} from "../../../services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DialogComponent} from "../../dialog/dialog.component";
import {SnackBarService} from "../../../services/snack-bar.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  topBar: TopBar;
  list: List;
  listButtons: ButtonItem[];

  constructor(private apiService: ApiService,
              private dialog: MatDialog,
              private nav: Router,
              private snackBar: SnackBarService,) {
  }

  ngOnInit() {
    this.topBar = {
      title: "Courses",
      buttons: [
        {
          title: 'New Course',
          action: () => {
            this.newCourse()
          }
        }
      ]
    };

    this.listButtons = [
      {
        title: "edit",
        action: (lessonId) => this.editCourse(this.nav, lessonId)
      },
      // {
      //   title: "delete",
      //   action: (userId)=> this.deleteUser(this.dialog, userId)
      // }
    ];

    this.apiService.getAllLessons().subscribe((res) => {
      console.log(res)
      res.status ? (this.list = {data: res.data, buttons: this.listButtons}) : new Error(res.msg);
    })

  }

  editCourse(nav: Router, lessonId: any) {

  }

  async newCourse() {
    const availableTeachers = await this.apiService.getTeachersWithoutLesson().toPromise();
    if (availableTeachers.status) {
      const dialogType = "CourseNewDialog";
      const msg = "Create new course";
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          dialogType,
          msg,
          availableTeachers: availableTeachers.data
        }
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (!result) return;
        const newSubmitCourse = {
          title: result.title,
          teacher: result.teacher
        };
        const updated = await this.apiService.createLesson(newSubmitCourse).toPromise();
        if(updated.status){
          this.snackBar.messageSuccess(updated.msg);
          this.ngOnInit();
        } else {
          this.snackBar.messageSuccess(updated.msg);
        }
      });

    } else {
      this.snackBar.messageSuccess(availableTeachers.msg);
    }
  }
}
