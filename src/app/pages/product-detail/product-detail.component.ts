import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/core/services/products/product.service';

const mockData = [
  {
    src: '../../../assets/images/profile-1.jpg'
  },
  {
    src: '../../../assets/images/profile-2.jpg.jpg'
  },
  {
    src: '../../../assets/images/profile-4.jpg.jpg'
  },
]

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {

  constructor(
    private productService: ProductService
  ) { }

  data: any = mockData;
  product: any;

  @Input() set id(productId: number) {
    this.getProduct(productId);
  }


  getProduct(productId: number) {
    this.productService.getProduct(productId).subscribe({
      next: resp => {
        this.product = resp;
        console.log('product detail',this.product)
      }
    })
  }

}
