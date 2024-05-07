import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';
import { ProductSliderComponent } from './components/product-slider/product-slider.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

export const routes: Routes = [
    {path:'register',component:RegisterComponent},
    {path: 'login',component:LoginComponent},
    {path:'validate-email/:token',component:ValidateEmailComponent},
    {path:'slider',component:ProductSliderComponent},
    {path:'catalog',component:ProductCardComponent}
];
