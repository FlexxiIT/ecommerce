import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ProductSliderComponent } from '../product-slider/product-slider.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,ProductSliderComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailComponent implements OnInit{
  products : any [] = [];
  selectedProduct : any;

  constructor(private pService: ClienteService){}

  ngOnInit(): void {
    this.pService.getProducts().subscribe((data)=>{
      this.products = data;
    })
    const productString = localStorage.getItem('selectedProduct');
    if (productString) {
      this.selectedProduct = JSON.parse(productString);
    }
  }

  getProduct(){

  }
}
