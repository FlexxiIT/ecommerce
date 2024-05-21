import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
  page: number = 1;
  searchWord: string = '';  

  constructor(private route:ActivatedRoute ,private router:Router,private pService: ClienteService){ }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1;
      this.searchWord = params['search'] || '';
      this.fetchProducts();
    })

    /*JSON SERVER
    this.pService.getProducts().subscribe((data) =>{
      this.products = data;
    });*/
    this.pService.getCategories().subscribe((data) =>{
      this.categories = data;
    });
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

    if(this.searchWord){
      this.pService.getProductBySearch(this.searchWord,this.page).subscribe(response =>{
        this.products = response.data;
      }, error =>{
        console.error('Error fetching products by search', error)
      });
    } else {
      this.pService.getProductsPagination(this.page).subscribe(response => {
        this.products = response.data
      }, error => {
        console.error('Error fetching products', error);
      });
    }

    this.pService.getProductsPagination(this.page).subscribe((data) =>{
      this.products = data;
    })
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

  private updateUrl():void{
    this.router.navigate([],{
      relativeTo: this.route,
      queryParams:{
        page: this.page,
        search:this.searchWord || null
      },
      queryParamsHandling: 'merge',
    });
  }
}
