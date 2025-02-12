import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { apis } from './apis';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { CartService } from '../../../cart/cart.service';

export interface Product {
  id: string;
  title: string;
  images: string[];
  categoryId: string;
  price: any;
  description: string;
  quantity: any;
  rating: number;
}

@Component({
  selector: 'app-product1',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, TruncatePipe],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  data: any;
  isLoading: boolean = false;
  productId = signal('');
  searchQuery: string = '';

  constructor(private http: HttpClient, private cartService: CartService) {}

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  product$ = this.activatedRoute.paramMap
    .pipe(
      map((params) => params.get('productId')),
      map((id) => this.productId.set(id!))
    )
    .subscribe();

  ngOnInit() {
    // search code
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchQuery = params['search'] || '';
      this.fetchProducts();
    });

    console.log(this.productId());
    const url = apis.find((api) => api.productId === this.productId())!?.url;
    this.isLoading = true;
    this.http.get(url).subscribe({
      next: (response) => {
        this.data = response;
        //         // Filter only electronic gadgets based on their category
        // this.data = {
        //   products: response.products.filter((item: Product) => item.categoryId === '1')
        // };
        this.isLoading = false;
        console.log(this.data);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error:', error);
      },
    });
  }

  fetchProducts() {
    const url = apis.find((api) => api.productId === this.productId())!?.url;
    this.isLoading = true;

    this.http.get(url).subscribe({
      next: (response) => {
        this.data = response;
        // Filter products based on search query
        if (this.searchQuery) {
          this.data.products = this.data.products.filter((item: Product) =>
            item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error:', error);
      },
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product); // Use the service to add items to the cart
    console.log('Cart Items:', this.cartService.cartItems$);
  }
}
