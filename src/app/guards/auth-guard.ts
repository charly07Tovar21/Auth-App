import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const matSnackBar = inject(MatSnackBar);

  if(inject(Auth).isLoggedIn()){
    return true;
  }

  matSnackBar.open("You must be logged in to view this page", 'Ok', {
    duration: 4000,
  });
  inject(Router).navigate(['/']);
  return false;
};
