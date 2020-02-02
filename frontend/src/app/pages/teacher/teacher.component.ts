import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  displayedColumns: string[] = ['Student','Grade', 'Timestamp', 'Submit'];
  dataSource = [];
  title='';
  constructor(private apiService: ApiService,public dialog: MatDialog) { }

  async ngOnInit() {
    const result = await this.apiService.getTeacher().toPromise();
    this.title = result.lessonTitle;
    this.dataSource = result.enrolledStudents;

  }

  submitGrade(data){
    this.openDialog(data);
  }

  openDialog(data): void {
    const typeOfSubmit = data.grade? 'Update' : 'Submit';
    const student = data.user;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        typeOfSubmit,
        student
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return;
      const newSubmitGrade = {
        grade: Number(result),
        student: data._id
      };
      console.log(newSubmitGrade)
        const updated = await this.apiService.submitGrade(newSubmitGrade).toPromise();
        console.log(updated)

    });
  }

}
