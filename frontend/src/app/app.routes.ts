import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';
import { ProductSliderComponent } from './components/product-slider/product-slider.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';

export const routes: Routes = [
    {path:'register',component:RegisterComponent},
    {path: 'login',component:LoginComponent},
    {path:'validate-email/:token',component:ValidateEmailComponent},
    {path:'slider',component:ProductSliderComponent},
    {path:'catalog',component:DashboardComponent},
    {path:'product',component:ProductDetailComponent},
    {path:'product/search',component:ProductDetailComponent},
    {path:'checkout',component:CheckoutFormComponent},
    {path:'purchasehistory',component:PurchaseHistoryComponent},
    {path:'cart',component:CartComponent}

];
