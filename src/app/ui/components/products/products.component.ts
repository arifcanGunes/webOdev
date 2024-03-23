import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListCategory } from 'src/app/models/list_category';
import { ListProduct } from 'src/app/models/list_product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  categoryUrl: string = 'https://localhost:7231/api/categories/getall'; 
  productBaseUrl: string = 'https://localhost:7231/api/products/';
  basePath :string = 'https://localhost:7231/Uploads/Images/';
  categories: ListCategory[] = [];
  products: ListProduct[] = [];
  errorMessage! : string;

  constructor(private httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }

  getAllCategories(){
    this.httpClient.get<ListCategory[]>(this.categoryUrl).subscribe({
      next: (categories) =>{
        this.categories = categories;
      },
      error: (error)=>{
        this.errorMessage = error;
      }
    });;
  }

  getAllProducts(){
    this.httpClient.get<ListProduct[]>(this.productBaseUrl +"getproductsdetails").subscribe({
      next: (products)=>{
        this.products = products;
      }
    });
  }

  getProductsByCategory(categoryName: string){
    this.httpClient.get<ListProduct[]>(`${this.productBaseUrl}getproductdetailbycategoryname?categoryName=${categoryName}`).subscribe({
      next: (products) => {
        this.products = products;
      }
    });
  }

  

}
