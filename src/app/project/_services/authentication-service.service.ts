import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import {HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;
  public baseUrl!: string;

  constructor(
    private route: Router,
    private http: HttpClient
  ) { 
   this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.get('user')));
   this.user = this.userSubject.asObservable();
   this.baseUrl = environment.baseUrl;
  }

  login(userName: string , password: string){

     return this.http.post<any>(`${this.baseUrl}/users/auth` , {userName , password}) ;

  }
}
