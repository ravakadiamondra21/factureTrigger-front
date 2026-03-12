import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/userService/user.service';
import { LoginUser } from 'src/app/models/loginUser';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
})
export class LoginAdminComponent {
  loginAdminForm!: FormGroup;
  loginError: boolean = false;
  notAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginAdminForm = this.formBuilder.group({
      userEmail: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginAdminForm.valid) {
      const loginAdmin: LoginUser = {
        userEmail: this.loginAdminForm.get('userEmail')?.value,
        password: this.loginAdminForm.get('password')?.value,
      };

      this.userService.login(loginAdmin).subscribe({
        next: (response) => {
          if(response.role != 'ADMIN') {
            this.notAdmin = true;
            return;
          }
          this.authService.loginAdmin(response);
          this.router.navigate(['/audit']);
          this.loginError = false;
        },
        error: (err) => {
          this.loginError = true;
          console.log(err);
        },
      });
    }
  }
}
