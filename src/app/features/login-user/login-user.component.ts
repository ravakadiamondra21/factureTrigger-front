import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/userService/user.service';
import { LoginUser } from 'src/app/models/loginUser';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})
export class LoginUserComponent {
  loginUserForm!: FormGroup;
  loginError: boolean = false;
  notUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginUserForm = this.formBuilder.group({
      userEmail: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginUserForm.valid) {
      const loginUser: LoginUser = {
        userEmail: this.loginUserForm.get('userEmail')?.value,
        password: this.loginUserForm.get('password')?.value,
      };

      this.userService.login(loginUser).subscribe({
        next: (response) => {
          if(response.role != 'USER') {
            this.notUser = true;
            return;
          }
          this.authService.loginUser(response);
          this.router.navigate(['/crudUser']);
          this.loginError = false;
          this.notUser = false;
        },
        error: (e) => {
          console.log(e);
          this.loginError = true;
        },
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
