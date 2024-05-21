import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductSliderComponent implements OnInit{
  products: any [] = [];

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
      slidesPerView: 4, // 4 slides visible for very large screens
    },
  };

  constructor(private router:Router, private prodService:ClienteService){ }

  ngOnInit(): void {
    this.getProducts();
  }

  onClickProduct(product: any) {
    // Guardar el producto en el localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    // Redirigir al componente Producto-Detallado
    this.router.navigate(['/product']);
    console.log(localStorage.getItem('selectedProduct'));
  }

  getProducts(){
    this.prodService.getProducts().subscribe((data) =>{
      this.products = data;
      console.log(this.products)
    })
  }
}
