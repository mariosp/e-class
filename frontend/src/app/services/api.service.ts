import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions;
  constructor(private http: HttpClient) {
    this.setToken();
  }

  async setToken() {
    const token = "Bearer " + await localStorage.getItem("TOKEN");
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }
  }

  async updateHeaders(){
    const token = "Bearer " + await localStorage.getItem("TOKEN");
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', token);
  }

  login(data): Observable<any> {
    return this.http.post(`${environment.server}auth/login` ,data);
  }

  logout(): Observable<any> {
    return this.http.get(`${environment.server}auth/logout`, this.httpOptions);
  }

  getStudent(): Observable<any> {
    return this.http.get(`${environment.server}student/getallenrolledlessons`, this.httpOptions);
  }
  getTeacher(): Observable<any> {
    return this.http.get(`${environment.server}teacher/getteacherlesson`, this.httpOptions);
  }

  submitGrade(data): Observable<any> {
    return this.http.post(`${environment.server}grade/add`,data, this.httpOptions);
  }

  //User Api
  //Get ALl User (admin)
  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.server}user/getAllUsers`, this.httpOptions);
  }

  //Get User info (ALL USERS) users/ or  Get user info by id (Admin) /user/:id
  getUser(userId = ""): Observable<any> {
    return this.http.get(`${environment.server}user/${userId}`, this.httpOptions);
  }

  //Delete User (admin)
  deleteUser(userId): Observable<any> {
    return this.http.delete(`${environment.server}user/${userId}`, this.httpOptions);
  }

  //Get User info (ALL USERS) users/ or  Get user info by id (Admin) /user/:id
  createUser(user:User): Observable<any> {
    return this.http.post(`${environment.server}user/create`, user, this.httpOptions);
  }

  updateUser(userId = "", user): Observable<any> {
    return this.http.patch(`${environment.server}user/${userId}`, user, this.httpOptions);
  }

  //----------//

  //Lesson Api

  getAllLessons(): Observable<any>{
    return this.http.get(`${environment.server}lesson/getAllLessons`, this.httpOptions);
  }

  createLesson(data): Observable<any>{
    return this.http.post(`${environment.server}lesson/create`, data, this.httpOptions);
  }

  enrollToLesson(data): Observable<any>{
    return this.http.post(`${environment.server}lesson/enroll`, data, this.httpOptions);
  }

  //---------//

  //Teacher
  getTeachersWithoutLesson(): Observable<any>{
    return this.http.get(`${environment.server}teacher/getTeachersWithoutLesson`, this.httpOptions);
  }

  //---------//

  //Student
  getNotEnrolledStudents(lessonId): Observable<any>{
    return this.http.get(`${environment.server}student/getNotenrolledStudents/${lessonId}`, this.httpOptions);
  }

}
