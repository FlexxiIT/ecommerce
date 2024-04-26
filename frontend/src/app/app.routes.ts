import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
    {path:'register',component:RegisterComponent},
    {path: 'login',component:LoginComponent},
    {path:'validate-email/:token',component:ValidateEmailComponent},
    {path:'products',component:ProductsComponent}
];
