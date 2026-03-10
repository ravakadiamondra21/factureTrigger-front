import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserRequest } from 'src/app/models/createUserRequest.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.apiUrlUser;

  constructor(private httpClient: HttpClient) {}

  public createUser(createUserRequest: CreateUserRequest): Observable<any> {
    return this.httpClient.post(`${this.api}/register`, createUserRequest, {
      responseType: 'text'
    });
  }
}
