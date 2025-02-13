import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { apis } from './apis';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { CartService } from '../../../cart/cart.service';
import { ProductService } from './product.service';

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
  productId = signal('');
  data: any;
  isLoading: boolean = false;
  searchQuery: string = '';

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  product$ = this.activatedRoute.paramMap
    .pipe(
      map((params) => params.get('productId')),
      map((id) => this.productId.set(id!))
    )
    .subscribe();

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('productId');
      if (id) {
        this.productId.set(id);
        this.productService.setProductId(id); // Store productId in service
      }
    });

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
    this.isLoading = true;
    const url = apis.find((api) => api.productId === this.productId())!?.url;

    this.http.get<{ products: Product[] }>(url).subscribe({
      next: (response) => {
        let products = response.products;

        // Filter products based on search query
        if (this.searchQuery.trim()) {
          const query = this.searchQuery.toLowerCase();
          products = products.filter(
            (product) =>
              product.title.toLowerCase().includes(query) ||
              product.description.toLowerCase().includes(query)
          );
        }
        this.data = { products };
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error:', error);
      },
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Cart Items:', this.cartService.cartItems$);
  }
}
