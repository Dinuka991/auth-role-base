import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import {HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public baseUrl: string;

  constructor(
    private route: Router,
    private http: HttpClient
  ) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
    this.baseUrl = environment.baseUrl;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.baseUrl}/users/authenticate`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
}
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  //this.userSubject.next();
  this.route.navigate(['/login']);
}
  
  
}
