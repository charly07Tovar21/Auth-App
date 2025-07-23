import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Auth } from '../../services/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  imports: [FormsModule, MatIconModule, MatSnackBarModule],
  standalone: true,
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword {
email!: string;
  authService = inject(Auth);
  matSnackbar = inject(MatSnackBar);
  showEmailSent = false;
  isSubmitting = false;

  forgetPassword() {
    this.isSubmitting = true;
    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.matSnackbar.open(response.message, 'Close', {
            duration: 5000,
          });
          this.showEmailSent = true;
        } else {
          this.matSnackbar.open(response.message, 'Close', {
            duration: 5000,
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackbar.open(error.message, 'Close', {
          duration: 5000,
        });
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
