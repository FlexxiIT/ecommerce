import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  categories: any[]=[];
  menuValue: boolean = false;
  menuIcon : string = 'fa-solid fa-bars'

  constructor(private catService: ClienteService){ }

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
      this.categories = data;
    })
  }

  openMenu(){
    this.menuValue = !this.menuValue
    this.menuIcon = this.menuValue ? 'fa-solid fa-x' : 'fa-solid fa-bars'
  }



}
