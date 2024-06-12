import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  options = [
    { value: '', label: '-' },
    { value: 'price:desc', label: 'Precio: Mayor a Menor' },
    { value: 'price:asc', label: 'Precio: Menor a Mayor' },
    { value: 'name:asc', label: 'A-Z' },
    { value: 'name:desc', label: 'Z-A' },
  ];

  categoryId: string = '';
  orderBy: string = '';
  categories: Product [] = [];
  products: any [] = [];
  isFilterMenuOpen = false;
  page: number = 1;
  searchWord: string = '';

  constructor(private route:ActivatedRoute ,private router:Router,private pService: ClienteService){ }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1;
      this.orderBy = params['orderBy'] || '';
      this.categoryId = params['categoryId'] || '';
      this.fetchProducts();
    })

    this.pService.getCategories().subscribe(
      (data) => {
        this.categories = data.categories
      },
      (error)=>{
        console.error(error);
      }
    );
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

  fetchProducts(): void{
    this.pService.getProductsPagination(this.page,this.categoryId,this.orderBy).subscribe(
      response => {
        this.products = response.products.productsEntities
        console.log(response)
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  onOrderChange(event: Event): void{
    const selectElement = event.target as HTMLSelectElement;
    this.orderBy = selectElement.value;
    this.page = 1;
    this.updateUrl(this.orderBy === '');
    this.fetchProducts();
  }

  onCategoryChange(categoryId: string): void {
    this.categoryId = categoryId;
    this.page = 1; 
    this.updateUrl();
    this.fetchProducts();
  }

  searchProducts():void{
    this.page = 1;
    this.updateUrl();
  }

  nextPage(): void {
    this.page++;
    this.updateUrl();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updateUrl();
    }
  }

  private updateUrl(removeOrderBy: boolean = false): void {
    let queryParams: any = {
      page: this.page,
      categoryId: this.categoryId || null,
      orderBy: removeOrderBy ? null : this.orderBy || null
    };

    // Remove empty params
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] === null || queryParams[key] === '') {
        delete queryParams[key];
      }
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
