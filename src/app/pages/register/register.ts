import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Roles } from '../../services/roles';
import { Observable } from 'rxjs';
import { Role } from '../../interfaces/role';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../interfaces/validation-error';

@Component({
  selector: 'app-register',
  imports: [MatInputModule, CommonModule,MatIconModule, RouterLink, ReactiveFormsModule, MatSelectModule, AsyncPipe],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  roleService = inject(Roles);
  authService = inject(Auth);
  matSnackbar = inject(MatSnackBar);
  roles$!: Observable<Role[]>
  fb = inject(FormBuilder);
  registerForm!: FormGroup;
  router = inject(Router);
  confirmPasswordHide: boolean = true;
  passwordHide: boolean = true;
  errors!: ValidationError[];

  register() {
    console.log('Form value:', this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);

        this.matSnackbar.open(response.message, 'Close',{
          duration: 3000,
          horizontalPosition: 'center',
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log('Backend error:', err.error);
        if(err!.status == 400) {
          this.errors = err!.error;
          this.matSnackbar.open('Validations error', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
          });
        }
      },
      complete: () => console.log('Register success')
    });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullName: ['', Validators.required],
      roles: [''],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: this.passwordMatchValidator,
    }
  );

    this.roles$ = this.roleService.getRoles();
  }


  private passwordMatchValidator (
    control: AbstractControl): 
    { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password != confirmPassword) {
      return { passwordMismatch: true};
    }
    return null;
  }
}
