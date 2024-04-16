import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router, private cService:ClienteService){
    this.registerForm = this.formBuilder.group({
      firstName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      lastName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      email: ["",[Validators.required,Validators.email,Validators.min(5)]],
      password: ["",[Validators.required,Validators.minLength(8),Validators.maxLength(24)]],
      confirmPassword:["",[Validators.required,Validators.minLength(8),Validators.maxLength(24)]],
      isAgree: [false,[Validators.requiredTrue]]
    })
  }
  onSubmit(){
    const isFormValid = this.registerForm.valid;
    debugger;
    console.log(isFormValid);

    if (this.registerForm.valid) {
      let idClient= Math.floor(Math.random() * (100 - 5 + 1)) + 5;
      let nameClient = this.registerForm.value.firstName;
      let surnameClient = this.registerForm.value.lastName;
      let passwordClient = this.registerForm.value.password;
      let emailClient = this.registerForm.value.email;
      const newClient = {
        id: idClient,
        firstname:nameClient,
        surname: surnameClient,
        email:emailClient,
        password: passwordClient
      };

      // Verificar si el email ya existe en la lista de clientes
      this.cService.getClientes().subscribe((clientes) => {
        if (clientes.some(cliente => cliente.email === newClient.email)) {
          alert('El correo electrónico ya está registrado');
        } else {
          // Agregar el nuevo cliente al servidor JSON si el email no existe
          this.cService.agregarCliente(newClient).subscribe(() => {
            alert('Cliente registrado exitosamente');
            this.registerForm.reset(); // Reiniciar el formulario después de agregar el cliente
          });
        }
      });
    }
  }
}
