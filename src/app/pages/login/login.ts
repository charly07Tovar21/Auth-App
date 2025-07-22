import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatIconModule,MatSnackBarModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  authService = inject(Auth);
  matSnackBar = inject(MatSnackBar);
  router=inject(Router)
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);

  login(){
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        this.matSnackBar.open(response.message,'Close',{
          duration:3000,
          horizontalPosition:'center'
        })
        this.router.navigate(['/'])
      },
      error:(error)=>{
        this.matSnackBar.open(error.error.message,'Close',{
          duration:3000,
          horizontalPosition:'center',
        });
      }
    });
  }

  register() {
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
