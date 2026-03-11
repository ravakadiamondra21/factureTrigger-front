import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  apiUrl = environment.apiUrlAudit;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  public getAllAudit(): Observable<any> {
    const token = this.userService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(`${this.apiUrl}/getAll`, { headers });
  }
}
