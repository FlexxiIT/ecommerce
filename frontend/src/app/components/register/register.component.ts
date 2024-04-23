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
  showPassword:any;
  showConfirmPassword:any;

  constructor(private formBuilder:FormBuilder, private router:Router, private cService:ClienteService){
    this.registerForm = this.formBuilder.group({
      firstName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      lastName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      email: ["",[Validators.required,Validators.email,Validators.min(5)]],
      password: ["",[Validators.required,Validators.minLength(8),Validators.maxLength(24)]],
      confirmPassword:["",[Validators.required,Validators.minLength(8),Validators.maxLength(24)]],
      phonenumber:["",[Validators.required]],
      isAgree: [false,[Validators.requiredTrue]]
    })
  }
  onSubmit(){
    const isFormValid = this.registerForm.valid;
    debugger;
    console.log(isFormValid);

    if (this.registerForm.valid) {
      let nameClient = this.registerForm.value.firstName;
      let surnameClient = this.registerForm.value.lastName;
      let passwordClient = this.registerForm.value.password;
      let confirmPasswordClient = this.registerForm.value.confirmPassword;
      let emailClient = this.registerForm.value.email;
      let phoneNumberClient= this.registerForm.value.phonenumber;
      const newClient = {
        name:nameClient,
        email:emailClient,
        password: passwordClient,
        confirmPassword:confirmPasswordClient,
        surname: surnameClient,
        phoneNumber: phoneNumberClient
      };

      this.cService.registerClient(newClient).subscribe((data)=>{
        console.log(data);
        console.log("Registrado pa");
      });
    }
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
        this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
}
  
}
