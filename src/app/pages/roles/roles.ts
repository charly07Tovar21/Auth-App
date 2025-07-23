import { Component, inject } from '@angular/core';
import { RoleForm } from '../../components/role-form/role-form';
import { Roles } from '../../services/roles';
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleList } from '../../components/role-list/role-list';
import { AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-roles',
  standalone:true,
  imports: [RoleForm, MatSelectModule,MatInputModule, RoleList, AsyncPipe, MatSnackBarModule],
  templateUrl: './roles.html',
  styleUrl: './roles.css'
})
export class Role {
  rolesService = inject(Roles);
  authService = inject(Auth);
  errorMessage = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;
  role$ = this.rolesService.getRoles();
  users$ = this.authService.getAll();
  snackBar = inject(MatSnackBar);
  selectedUser: string = '';
  selectedRole: string = '';

  createRole(role: RoleCreateRequest) {
    this.rolesService.createRole(role).subscribe({
      next: (response: { message: string }) => {
        this.role$ = this.rolesService.getRoles();
        this.snackBar.open("Role Created Successfuly", 'Ok', {
          duration: 4000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    },
    );
  }

  deleteRole(id: string) {
    this.rolesService.delete(id).subscribe({
      next: (response) => {
        this.role$ = this.rolesService.getRoles();
        this.snackBar.open("Role deleted successfuly", 'Close', {
          duration: 5000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, 'Close', {
          duration: 3000,
        });
      }
    });
  }


  assignRole(){
    this.rolesService.assignRole(this.selectedUser, this.selectedRole).subscribe({
      next: (response) => {
        this.role$ = this.rolesService.getRoles();
        this.snackBar.open("Role assigned successfuly", 'Close', {
          duration: 5000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, 'Close', {
          duration: 3000,
        });
      }
    });
  }

}
