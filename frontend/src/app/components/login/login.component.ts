import { Component } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router, private cService:ClienteService){
    this.loginForm = this.formBuilder.group({
      email: ["",[Validators.required,Validators.email,Validators.min(5)]],
      password: ["",[Validators.required,Validators.minLength(8),Validators.maxLength(24)]],
    })
  }

  onSubmit(){
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // Llamar al método de autenticación del servicio
      this.cService.autenticarUsuario(email, password).subscribe((clientes) => {
        if (clientes.length > 0) {
          // Autenticación exitosa, redirigir a otra página o realizar otras acciones
          console.log('Autenticación exitosa');
        } else {
          // Autenticación fallida, mostrar un mensaje de error o realizar otras acciones
          console.log('Autenticación fallida');
        }
      });
    }
  }
}
