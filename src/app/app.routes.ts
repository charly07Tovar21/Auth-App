import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Account } from './pages/account/account';
import { authGuard } from './guards/auth-guard';
import { Users } from './pages/users/users';
import { roleGuard } from './guards/role-guard';
import { Role } from './pages/roles/roles';
import { ForgetPassword } from './pages/forget-password/forget-password';
import { ResetPassword } from './pages/reset-password/reset-password';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'account/: id',
        component: Account,
        canActivate: [authGuard],
    },
    {
        path: 'forget-password',
        component: ForgetPassword,
    },
    {
        path: 'reset-password',
        component: ResetPassword,
    },
    {
        path: 'users',
        component: Users,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin'],
        },
    },
    {
        path: 'roles',
        component: Role,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin'],
        },
    },
    
];
