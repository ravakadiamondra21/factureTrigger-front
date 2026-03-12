import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const adminToken = this.authService.getAdmin()?.token;
    const userToken = this.authService.getUser()?.token;

    const token = adminToken || userToken;

    const isExcluded = request.url.includes('/auth/register') || request.url.includes('/auth/login');

    if (token && !isExcluded) {
      
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
