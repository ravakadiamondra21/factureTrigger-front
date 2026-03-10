import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/userService/user.service';
import { LoginUser } from 'src/app/models/loginUser';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})
export class LoginUserComponent {
  loginUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
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
        password: this.loginUserForm.get('password')?.value
      }

      console.log(loginUser)

      this.userService.login(loginUser).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/crudUser']);
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
