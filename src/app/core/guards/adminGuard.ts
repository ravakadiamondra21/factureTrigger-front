import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginUserResponse } from 'src/app/models/loginUserResponse';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
  })
export class AdminGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const admin: LoginUserResponse | null = this.authService.getAdmin();

    if (!admin) {
      this.router.navigate(['/loginAdmin']);
      return false;
    }
    return true;
  }
}
