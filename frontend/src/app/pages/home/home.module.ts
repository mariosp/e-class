import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {StudentComponent} from "../student/student.component";
import {TeacherComponent} from "../teacher/teacher.component";
import {DialogComponent} from "../dialog/dialog.component";
import {ToolbarButtonsComponent} from "../../components/toolbar-buttons/toolbar-buttons.component";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {RouterModule, Routes} from "@angular/router";
import {AccountsComponent} from "../admin/accounts/accounts.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path:"accounts",
        component:AccountsComponent
      },
      {
        path:"my-lesson",
        component:TeacherComponent,
      },
      {
        path:"my-courses",
        component:StudentComponent
      },
    ]
  },
];


@NgModule({
  declarations: [
    HomeComponent,
    StudentComponent,
    TeacherComponent,
    DialogComponent,
    ToolbarButtonsComponent,
    AccountsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[DialogComponent]
})
export class HomeModule { }
