import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Product {
  id: string;
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  productDetails: Product[] = [
    {
      id: '1',
      title: 'SmartPhones',
      imageUrl:
        'https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/3.png',
    },
    {
      id: '2',
      title: 'Laptops',
      imageUrl:
        'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.png',
    },
    {
      id: '3',
      title: 'Tablets',
      imageUrl:
        'https://cdn.dummyjson.com/products/images/tablets/Samsung%20Galaxy%20Tab%20S8%20Plus%20Grey/4.png',
    },
    {
      id: '4',
      title: 'Mobile-Accessories',
      imageUrl:
        'https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/1.png',
    },
  ];
}
