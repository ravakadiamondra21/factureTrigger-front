import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChildFn, Router } from '@angular/router';
import { LoginUserResponse } from 'src/app/models/loginUserResponse';
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn: 'root',
})
export class UserGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user: LoginUserResponse | null = this.authService.getUser();

    if (!user) {
      this.router.navigate(['/loginUser']);
      return false;
    }
    return true;
  }
}
