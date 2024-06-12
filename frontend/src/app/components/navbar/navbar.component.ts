import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  categories: Category[]=[];
  menuValue: boolean = false;
  menuIcon : string = 'fa-solid fa-bars'
  searchWord: string = ''

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

  onSearch(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/products'], {
      queryParams: { search: this.searchWord, page: 1 },
      queryParamsHandling: 'merge' // Merge with other existing query params
    });
  }
}
