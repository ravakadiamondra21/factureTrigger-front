import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateFactureModel } from 'src/app/models/createFactureModel';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  private apiUrl = environment.apiUrlFacture;
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  public insertFacture(
    createFactureModel: CreateFactureModel
  ): Observable<any> {
    const token = this.userService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(`${this.apiUrl}/create`, createFactureModel, {
      headers,
    });
  }

  public selectAllFacture(): Observable<any> {
    const token = this.userService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(`${this.apiUrl}/findAll`, { headers });
  }

  public updateFacture(
    facture: CreateFactureModel,
    num_facture: number
  ): Observable<any> {
    const token = this.userService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.put(
      `${this.apiUrl}/update/${num_facture}`,
      facture,
      { headers }
    );
  }
}
