import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from 'src/app/core/services/products/product.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CategoryComponent } from 'src/app/core/components/category/category.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AddProductComponent } from '../add-product/add-product.component';

interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule, MatPaginatorModule, CategoryComponent,MatButtonModule,AddProductComponent,MatDialogModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  searchQuery: string = '';
  products!: Products[];
  categories!: any[];

  limit: number = 10;
  skip: number = 0;
  select: string = '';
  totalProducts?: number;
  categorySelected!: string;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.handleScroll();
  }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(param => {
      const query = param.get('q');
      if (query) {
        this.searchProducts(query);
      } else {
        this.getProducts();
        this.router.navigate(['/products'])
      }
    })
    this.getCategories();


  }
  getProducts() {
    this.productService.getProducts(this.limit, this.skip, this.select).subscribe({
      next: (resp: any) => {
        this.totalProducts = resp.total;
        this.products = resp.products;
      }
    })
  }

  discount(price: number, discountPercentage: number) {
    const validDiscountPercentage = Math.max(0, Math.min(discountPercentage, 100));
    const discountedPrice = price - (price * validDiscountPercentage) / 100;
    return discountedPrice.toFixed(2);
  }


  searchProducts(event: any) {
    this.productService.searchProducts(event).subscribe({
      next: (resp: any) => {
        this.products = resp.products;
      }
    })
  }

  handleScroll() {
    let queryParam = null;
    this.route.queryParamMap.subscribe(param => queryParam = param.get('q'));

    if (this.isScrolledToBottom()) {
      this.limit += 10;

      if (this.categorySelected) {
        return;
      };

      if (queryParam !== null) {
        console.log(queryParam)
        return;
      }

      this.getProducts();
    }
  }

  isScrolledToBottom(): boolean {
    const scrollHeight = window.scrollY + window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    return scrollHeight >= totalHeight;
  }

  getCategories() {
    this.productService.getCategories().subscribe({
      next: resp => {
        this.categories = resp;
      }
    })
  }

  productsByCategory(category: string) {

    this.categorySelected = category;
    if (category) {
      this.productService.getProductsByCategory(category).subscribe({
        next: (resp: any) => {
          this.products = resp.products;
        }
      })
      return;
    }

    if(category === null) {
      this.limit = 10;
      this.router.navigate(['/products']);
    }

    this.getProducts();

  }

  openDialogAddProduct(){
    const dialogRef =  this.dialog.open(AddProductComponent, {
      disableClose:true,
      width:'50%',
      height:'50%',
      data: {
        name: 'On development'
      }
    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('dialog closed', result)
  })
  }

}
