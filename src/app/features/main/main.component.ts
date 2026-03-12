import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private authService: AuthService, private router: Router) {}
  goToUser() {
    if (this.authService.getUser()) {
      this.router.navigate(['/crudUser']);
    } else {
      this.router.navigate(['/loginUser']);
    }
  }

  goToAdmin() {
    if (this.authService.getAdmin()) {
      this.router.navigate(['/audit']);
    } else {
      this.router.navigate(['/loginAdmin']);
    }
  }
}
