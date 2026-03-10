import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/userService/user.service';
import { CreateUserRequest } from 'src/app/models/createUserRequest.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  createUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUserForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        password: ['', Validators.required],
        confirmPwd: ['', Validators.required],
      },
      {
        validators: this.passwordValidator,
      }
    );
  }

  passwordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPwd = control.get('confirmPwd')?.value;

    if (password != confirmPwd) {
      return { passwordMismatch: true };
    }
    return null;
  };

  onSubmit() {

    if (this.createUserForm.invalid) {
      this.createUserForm.markAllAsTouched();
      return;
    }

    if (this.createUserForm.valid) {
      const createUserRequest: CreateUserRequest = {
        email: this.createUserForm.value.email,
        name: this.createUserForm.value.name,
        password: this.createUserForm.value.password,
        role: 'USER',
      };

      this.userService.createUser(createUserRequest).subscribe({
        next: (response) => {
          console.log(response);

          this.router.navigate(['/loginUser'])
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
