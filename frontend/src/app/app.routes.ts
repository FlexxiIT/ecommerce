import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';

export const routes: Routes = [
    {path:'',component:RegisterComponent},
    {path: 'login',component:LoginComponent},
    {path:'validate-email/:token',component:ValidateEmailComponent}
];
