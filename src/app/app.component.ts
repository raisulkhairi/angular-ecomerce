import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent,RouterOutlet,RouterModule]
})
export class AppComponent {
  title = 'first-angular';
}
