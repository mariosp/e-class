import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

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
}
