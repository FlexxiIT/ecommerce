import { Component, inject } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean= false;
  toastr= inject(ToastrService);
  message:string='';

  constructor(private formBuilder:FormBuilder, private router:Router, private cService:ClienteService){
    this.loginForm = this.formBuilder.group({
      email: ["",[Validators.required,Validators.email,Validators.min(5)]],
      password: ["",[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
    })
  }

  onSubmit(){
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.cService.loginCLient(email,password).subscribe({
        next: (data) => {
          localStorage.setItem('token',data.user.token)
          localStorage.getItem('token');
          console.log("logueado");
          // Realiza acciones adicionales según sea necesario
        },
        error: (error) => {
          console.error("Error:", error);
          // Si el error es debido a que el email ya está en uso
          this.message= error.error.error;
          this.toastr.error(this.message,"Error");
        }
      })
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
