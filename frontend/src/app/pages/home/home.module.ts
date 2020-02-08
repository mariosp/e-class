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
import {TopBarComponent} from "../../components/top-bar/top-bar.component";
import {ListComponent} from "../../components/list/list.component";
import {CardComponent} from "../../components/card/card.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {TokenGuard} from "../../services/token.guard";
import {UserComponent} from "../user/user.component";
import {MatSelectModule} from "@angular/material/select";
import {CoursesComponent} from "../admin/courses/courses.component";
import { MatExpansionModule} from "@angular/material/expansion";

// const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//     canActivate: [TokenGuard],
//     children:[
//       {
//         path:"my-lesson",
//         component:TeacherComponent,
//       },
//       {
//         path:"my-courses",
//         component:StudentComponent
//       },
//       {
//         path:"accounts",
//         component:AccountsComponent
//       },
//       {
//         path:"user",
//         component: UserComponent
//       },
//       {
//         path:"user/new",
//         component: UserComponent
//       },
//       {
//         path:"user/edit",
//         component: UserComponent
//       },
//       {
//         path:"user/:id",
//         component: UserComponent
//       },
//       {
//         path:"user/:id/edit",
//         component: UserComponent
//       },
//     ]
//   },
// ];

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [TokenGuard],
    children:[
      {
        path:"my-lesson",
        component:TeacherComponent,
      },
      {
        path:"my-courses",
        component:StudentComponent
      },
      {
        path:"accounts",
        component:AccountsComponent
      },
      {
        path:"user",
        component: UserComponent
      },
      {
        path:"user/new",
        component: UserComponent
      },
      {
        path:"user/edit",
        component: UserComponent
      },
      {
        path:"user/:id",
        component: UserComponent
      },
      {
        path:"user/:id/edit",
        component: UserComponent
      },
      {
        path:"courses",
        component: CoursesComponent
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
    AccountsComponent,
    TopBarComponent,
    ListComponent,
    CardComponent,
    UserComponent,
    CoursesComponent
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
    MatCardModule,
    MatGridListModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    MatExpansionModule
  ],
  entryComponents:[DialogComponent]
})
export class HomeModule { }
