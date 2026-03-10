import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CreateUserRequest } from 'src/app/models/createUserRequest.model';
import { LoginUser } from 'src/app/models/loginUser';
import { LoginUserResponse } from 'src/app/models/loginUserResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.apiUrlUser;

  private currentUserSubject = new BehaviorSubject<LoginUserResponse | null>(
    null
  );
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  public createUser(createUserRequest: CreateUserRequest): Observable<any> {
    return this.httpClient.post(`${this.api}/register`, createUserRequest, {
      responseType: 'text',
    });
  }

  public login(loginUser: LoginUser): Observable<LoginUserResponse> {
    return this.httpClient
      .post<LoginUserResponse>(`${this.api}/login`, loginUser)
      .pipe(
        tap((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  public logout() {
    localStorage.removeItem('currentUser');
  }

  public getToken(): string | null {
    return this.currentUserSubject.value?.token || null;
  }

  public getCurrentUser(): LoginUserResponse | null {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
} 
