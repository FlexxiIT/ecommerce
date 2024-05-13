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

  breakpoints: Record<number, { slidesPerView: number }> = {
    320: {
      slidesPerView: 1, // 1 slide visible for small screens
    },
    480: {
      slidesPerView: 2, // 2 slides visible for medium screens
    },
    768: {
      slidesPerView: 3, // 3 slides visible for larger screens
    },
    1024: {
      slidesPerView: 3, // 4 slides visible for very large screens
    },
  };

  constructor(private pService: ClienteService){}

  ngOnInit(): void {
    this.pService.getProducts().subscribe((data)=>{
      this.products = data;
    })
  }
}
