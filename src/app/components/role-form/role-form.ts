import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RoleCreateRequest } from '../../interfaces/role-create-request';

@Component({
  selector: 'app-role-form',
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './role-form.html',
  styleUrl: './role-form.css'
})
export class RoleForm {
  @Input({ required: true }) role!: RoleCreateRequest;
  @Input() errorMessage!:string;
  @Output() addRole: EventEmitter<RoleCreateRequest> =
    new EventEmitter<RoleCreateRequest>();

  add() { 
    this.addRole.emit(this.role);
  }
}
