import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit{

  options = [
    { value: 'minor-major', label: 'Precio: Menor a Mayor' },
    { value: 'major-minor', label: 'Precio: Mayor a Menor' },
    { value: 'a-z', label: 'A-Z' },
    { value: 'z-a', label: 'Z-A' },
];

  categories: any [] = [];
  products: any [] = [];
  isFilterMenuOpen = false;

  constructor(private router:Router,private pService: ClienteService){ }

  ngOnInit(): void {
    this.pService.getProducts().subscribe((data) =>{
      this.products = data;
    })
    this.pService.getCategories().subscribe((data) =>{
      this.categories = data;
    })
  }

  toggleFilterMenu() {
      this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }
  onClickProduct(product: any) {
    // Guardar el producto en el localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    // Redirigir al componente Producto-Detallado
    this.router.navigate(['/product']);
    console.log(localStorage.getItem('selectedProduct'));
  }
}
