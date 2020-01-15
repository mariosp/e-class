import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['Lesson','Teacher', 'Grade', 'Timestamp'];
  dataSource = [];
  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    const result = await this.apiService.getStudent().toPromise();

    this.dataSource = result.courses;

  }

}
