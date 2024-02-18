import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { menuMock, messageMock } from '../../services/mock';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../authentication/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatBadgeModule, MatIconModule, MatButtonModule, MatMenuModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  hidden = false;
  messages: any;
  menu: any;
  searchQuery: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getMessages();
    this.getMenu();
  }


  getMessages() {
    this.messages = messageMock;
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  getMenu() {
    this.menu = menuMock;
  }

  logout() {
    this.authService.logout();
  }


  searchProduct() {
    this.router.navigate(['/products/search'], { queryParams: { q: this.searchQuery } })
  }

}
