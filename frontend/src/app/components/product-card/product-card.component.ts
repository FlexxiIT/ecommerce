import { Component, OnInit, inject } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
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

  categoryId: string = '908cc3e3-28d3-4176-a55a-7f8e98e7fb4e';
  orderBy: string = '';
  categories: Product [] = [];
  products: any [] = [];
  isFilterMenuOpen = false;
  page: number = 1;
  totalPages: number = 0;
  searchWord: string = '';
  toastr= inject(ToastrService);

  constructor(private route:ActivatedRoute ,private router:Router,private pService: ClienteService, private cService: CartService){ }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1;
      this.orderBy = params['orderBy'] || '';
      this.categoryId = params['categoryId'] || '';
      this.searchWord = params['search'] || '';
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

  fetchProducts(): void {
    if (this.searchWord) {
      // Realiza la búsqueda por palabra clave si searchWord no está vacío
      this.pService.getProductBySearch(this.searchWord, this.page).subscribe(
        response => {
          this.totalPages = Math.ceil(response.products.total / 10);
          this.products = response.products.productsEntities;
          console.log(response);
        },
        error => {
          console.error('Error fetching products', error);
        }
      );
    } else {
      // Realiza la paginación estándar si searchWord está vacío
      this.pService.getProductsPagination(this.page, this.categoryId, this.orderBy).subscribe(
        response => {
          this.totalPages = Math.ceil(response.products.total / 10);
          this.products = response.products.productsEntities;
          console.log(response);
        },
        error => {
          console.error('Error fetching products', error);
        }
      );
    }
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

    if(this.categoryId){
      this.router.navigate(
        ['/catalog/category', this.categoryId],
        {queryParams: queryParams}
      );
    } else {
      this.router.navigate(
        ['/catalog'],
        {queryParams: queryParams}
      );
    }
  }

  addItemtoCart(productId:string):void{
    const itemDetails: any = {
      productId: productId,
      quantity: 1
    };   
    this.cService.addItemtoCart(itemDetails).subscribe(
      response => {
        console.log(response)
        console.log('HOLA')
      },
       error => {
        if(error.status){
          switch(error.status){
            case 401:
              this.toastr.error("Debe iniciar sesión", "Error de Autenticación");
              this.router.navigate(['/login']);
              break;
            case 500:
              this.toastr.error("No hay más stock", "Error del Servidor");
              break;
            default:
              this.toastr.error("Ocurrió un error", `Error ${error.status}`);
          }
        }
      }
    );
  }

  discountProduct(price:number, discount: number):number{
    const discountDecimal = discount / 100;
    return parseFloat((price - (price * discountDecimal)).toFixed(2));
  }
}
