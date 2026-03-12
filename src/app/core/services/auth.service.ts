import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginUserResponse } from 'src/app/models/loginUserResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminSubject = new BehaviorSubject<LoginUserResponse | null>(null);
  private userSubject = new BehaviorSubject<LoginUserResponse | null>(null);

  admin = this.adminSubject.asObservable();
  user = this.userSubject.asObservable();

  constructor() {
    const admin = localStorage.getItem('admin');
    const user = localStorage.getItem('user');

    if (admin) {
      this.adminSubject.next(JSON.parse(admin));
    }

    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  loginAdmin(admin: LoginUserResponse) {
    localStorage.setItem('admin', JSON.stringify(admin));
    this.adminSubject.next(admin);
  }

  loginUser(user: LoginUserResponse) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getAdmin() {
    return this.adminSubject.value;
  }

  getUser() {
    return this.userSubject.value;
  }

  logoutAdmin() {
    localStorage.removeItem('admin');
    this.adminSubject.next(null);
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
