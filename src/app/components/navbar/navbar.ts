import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import {MatMenuModule} from "@Angular/material/menu"
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, MatMenuModule,MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
authService = inject(Auth);
matSnackBar = inject(MatSnackBar)
router = inject(Router);

isLoggedIn() {
  return this.authService.isLoggedIn();
}

logout = () =>{
this.authService.logout();
this.matSnackBar.open('Logout success', "Close", {
  duration: 3000,
  horizontalPosition: "center"
})
this.router.navigate(['/login'])
};

}
