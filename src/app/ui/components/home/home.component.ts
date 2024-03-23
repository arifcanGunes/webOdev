import { Component, Input, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ListProduct } from 'src/app/models/list_product';
import { ListCategory } from 'src/app/models/list_category';
import { Observable } from 'rxjs';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  id: number;
  url: string = 'https://localhost:7231/api/products/getproductsdetails';
  products: ListProduct[] = [];
  product: ListProduct;
  populerProducts: ListProduct[] = [];
  errorMessage! : string;
  basePath :string = 'https://localhost:7231/Uploads/Images/';

  constructor(private httpClient : HttpClient) {
  }
  ngOnInit() {
    var random = Math.floor(Math.random()*5);
    while(random == 0){
      random = Math.floor(Math.random()*5);
    }
    console.log(random);
    this.getProducts().subscribe({
      next: (products) =>{
        this.products = products;
        for (let i = 0; i < this.products.length; i++) {
          if(this.products[i].productId == random){
            this.populerProducts.push(products[i]);
            random = random+3;
          }
        }
        
      },
      error: (error)=>{
        this.errorMessage = error;
      }
    });
  }

  getProducts() : Observable<ListProduct[]>{
    return this.httpClient.get<ListProduct[]>(this.url);
  }
  
}
