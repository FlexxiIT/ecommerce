import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router){
    this.registerForm = this.formBuilder.group({
      firstName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      lastName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      email: ["",[Validators.required,Validators.email,Validators.min(5)]],
      password: ["",[Validators.required,Validators.minLength(8),Validators.maxLength(24)]],
      isAgree: [false,[Validators.requiredTrue]]
    })
  }
  onSubmit(){
    const isFormValid = this.registerForm.valid;
    debugger;
    console.log(isFormValid);
  }
}
