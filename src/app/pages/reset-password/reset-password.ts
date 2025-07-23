import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ResetPasswordRequest } from '../../interfaces/reset-password-request';
import { Auth } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  resetPassword = {} as ResetPasswordRequest;
  authService = inject(Auth);
  router = inject(Router);
  route = inject(ActivatedRoute);
  matSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resetPassword.email = params['email'];
      this.resetPassword.token = params['token'];
    });
  }

  resetPasswordHandle() {
    this.authService.resetPassword(this.resetPassword).subscribe({
      next: (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
        });

        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 5000,
        });
      },
    });
  }
}
