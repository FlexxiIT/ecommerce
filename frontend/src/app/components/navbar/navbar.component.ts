import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../interfaces/category';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  //categories: Category[]=[];
  menuValue: boolean = false;
  searchInput: boolean = false;
  userMenuVisible: boolean = false;
  menuIcon : string = 'fa-solid fa-bars'
  searchWord: string = '';
  categories = [
    {
      name: 'Tecnología',
      subCategories: [
        { name: 'Programación' },
        { name: 'Redes' },
        { name: 'Ciberseguridad' }
      ]
    },
    {
      name: 'Ciencia',
      subCategories: [
        { name: 'Física' },
        { name: 'Química' },
        { name: 'Biología' }
      ]
    },
    {
      name: 'Salud',
      subCategories: [
        { name: 'Medicina' },
        { name: 'Nutrición' }
      ]
    },
    {
      name: 'Deportes',
      subCategories: [
        { name: 'Fútbol' },
        { name: 'Baloncesto' }
      ]
    },
    {
      name: 'Arte',
      subCategories: [] // Sin subcategorías
    },
    {
      name: 'Literatura',
      subCategories: [
        { name: 'Poesía' },
        { name: 'Narrativa' }
      ]
    },
    {
      name: 'Historia',
      subCategories: []
    },
    {
      name: 'Música',
      subCategories: [
        { name: 'Clásica' },
        { name: 'Rock' }
      ]
    },
    {
      name: 'Cine',
      subCategories: [
        { name: 'Drama' },
        { name: 'Comedia' }
      ]
    },
    {
      name: 'Negocios',
      subCategories: [
        { name: 'Finanzas' },
        { name: 'Marketing' }
      ]
    }
  ];

  constructor(private route:ActivatedRoute, private router: Router, private catService: ClienteService){ }

  showMenu() {
    // Get the elements from the DOM
    const toggle = document.getElementById('nav__toggle');
    const nav = document.getElementById('nav-menu');

    // Alterna las clases de los elementos
    if (nav) {
      nav.classList.toggle('show-menu');
  }

  if (toggle) {
      toggle.classList.toggle('show-icon');
  }
}

  ngOnInit(): void {
    this.catService.getCategories().subscribe((data)=>{
      this.categories = data.categories;
      console.log(this.categories)
    })
  }

  openMenu(){
    this.menuValue = !this.menuValue
    this.menuIcon = this.menuValue ? 'fa-solid fa-x' : 'fa-solid fa-bars'
  }

  toggleInput(){
    this.searchInput = !this.searchInput;
    if (this.searchInput) {
      setTimeout(() => {
          const searchBox = document.querySelector('input[placeholder="Buscar"]') as HTMLInputElement;
          if (searchBox) {
              searchBox.focus();
          }
      }, 0);
  } else{
    this.onSearch();
  }
  }

  toggleUserMenu() {
    this.userMenuVisible = !this.userMenuVisible;
  }
  toggleMenu(){
    this.menuValue = !this.menuValue;
  }

  onSearch(): void {
    
    if (this.searchWord.trim()) {
      this.router.navigate(['/catalog'], { queryParams: { search: this.searchWord, page: 1 } });
    }
  }
}
