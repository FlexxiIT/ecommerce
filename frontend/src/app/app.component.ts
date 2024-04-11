import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColorPickerModule,RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
