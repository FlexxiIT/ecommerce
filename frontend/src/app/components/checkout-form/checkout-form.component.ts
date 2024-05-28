import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeocodingService } from '../../services/geocoding.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})
export class CheckoutFormComponent {
  postalCode: string = '';
  state: string = '';
  checkoutForm : FormGroup
  postalCodeExists : boolean = false;
  toastr= inject(ToastrService);

  constructor(private formBuilder:FormBuilder, private geoService: GeocodingService){
    this.checkoutForm = this.formBuilder.group({
      street:['',[Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
      streetNumber:['',[Validators.required, Validators.minLength(3),Validators.maxLength(10)]],
      department:['',[Validators.minLength(3),Validators.maxLength(15)]],
      city:['',[Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
      postalCode:['',[Validators.required]]
    })
  }

  getPostalCode():void{
    this.postalCode = this.checkoutForm.get('postalCode')?.value;

    this.geoService.getLocation(this.postalCode).subscribe((response:any) =>{
      if(response && response.places && response.places.length > 0){
        const place = response.places[0];
        console.log(response.places[0].state)
        this.state= response.places[0].state
        this.postalCodeExists = !this.postalCodeExists
      }
    },error =>{
      console.error('Error fetching location data:', error);
      this.toastr.error("Codigo Postal Incorrecto","Error")
    })
  }

  onSubmitPostalCode():void{
    if(this.checkoutForm.valid){
      const checkoutData = this.checkoutForm.value;
      console.log('Checkout Data:')
    }
    this.getPostalCode();
  }

  togglePostalCode():void{
    this.postalCodeExists = !this.postalCodeExists
  }

}
