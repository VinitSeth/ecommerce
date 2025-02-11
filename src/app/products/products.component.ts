import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FilterByCategoryPipe } from '../pipes/filter-by-category.pipe';

export interface Product {

  id: string;
  title: string;
  imageUrl: string;
  categoryId: string;  // Added to associate products with categories
}

export interface Category {
  id: string;
  name: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, RouterLink, CommonModule,FilterByCategoryPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productDetails: Product[] = [
    // Gadgets
    { id: '1', title: 'SmartPhone', imageUrl: "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/3.png", categoryId: '1' },
    { id: '2', title: 'Laptops', imageUrl: "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.png", categoryId: '1' },
    { id: '3', title: 'Tablets', imageUrl:  "https://cdn.dummyjson.com/products/images/tablets/Samsung%20Galaxy%20Tab%20S8%20Plus%20Grey/4.png", categoryId: '1' },
    { id: '4', title: 'Mobile-Accessories', imageUrl: "https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/1.png", categoryId: '1' },

    // Men's
    { id: '5', title: "Shirts", imageUrl: "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/1.png", categoryId: '2' },
    { id: '6', title: "Shoes", imageUrl: "https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/1.png", categoryId: '2' },
    { id: '7', title: "Watches", imageUrl: "https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/1.png", categoryId: '2' },
    { id: '8', title: 'Sunglasses', imageUrl: "https://cdn.dummyjson.com/products/images/sunglasses/Black%20Sun%20Glasses/2.png", categoryId: '2' },

    // Women's
    { id: '9', title: 'Dresses', imageUrl: "https://cdn.dummyjson.com/products/images/womens-dresses/Black%20Women's%20Gown/1.png", categoryId: '3' },
    { id: '10', title: 'Jewellery', imageUrl:  "https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Crystal%20Earring/3.png", categoryId: '3' },
    { id: '11', title: 'Bags', imageUrl: "https://cdn.dummyjson.com/products/images/womens-bags/Blue%20Women's%20Handbag/3.png", categoryId: '3' },
    { id: '12', title: 'Shoes', imageUrl:  "https://cdn.dummyjson.com/products/images/womens-shoes/Black%20&%20Brown%20Slipper/4.png", categoryId: '3' },

    // Home Essentials
    { id: '13', title: 'Furniture', imageUrl: "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/3.png", categoryId: '4' },
    { id: '14', title: 'Home Accessories', imageUrl: "https://cdn.dummyjson.com/products/images/home-decoration/Family%20Tree%20Photo%20Frame/1.png", categoryId: '4' },
    { id: '15', title: 'Kitchen Appliances', imageUrl:"https://cdn.dummyjson.com/products/images/kitchen-accessories/Black%20Aluminium%20Cup/2.png", categoryId: '4' },
    { id: '16', title: 'Groceries', imageUrl:  "https://cdn.dummyjson.com/products/images/groceries/Cucumber/1.png", categoryId: '4' },
  ];

  productCategories: Category[] = [
    { id: '1', name: 'Gadgets' },
    { id: '2', name: 'Men\'s' },
    { id: '3', name: 'Women\'s' },
    { id: '4', name: 'Home Essentials' }
  ];
}
