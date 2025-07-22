import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Roles {
  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) {}

  getRoles = () : Observable<Role[]> =>
    this.http.get<Role[]>(`${this.apiUrl}roles`)
}
