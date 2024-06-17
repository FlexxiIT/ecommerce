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

  onSearch(): void {
    if (this.searchWord.trim()) {
      this.router.navigate(['/catalog'], { queryParams: { search: this.searchWord, page: 1 } });
    }
  }
}
