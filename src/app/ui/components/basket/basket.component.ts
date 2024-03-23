import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Basket } from 'src/app/models/basket';
import { ListBasket } from 'src/app/models/list_basket';
import { ListProduct } from 'src/app/models/list_product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit{
  basket: Basket[] = [];
  products: ListBasket[] = [];
  productUrl: string = 'https://localhost:7231/api/products/getproductbyid?id=';
  basePath :string = 'https://localhost:7231/Uploads/Images/';
  isBasketEmpty: boolean = true;

  constructor(private httpClient: HttpClient) {
  }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    if(localStorage.getItem("basket") != null){
      this.basket = JSON.parse(localStorage.getItem("basket"));
      for (let i = 0; i < this.basket.length; i++) {
        this.httpClient.get<ListProduct>(`${this.productUrl}${this.basket[i].productId}`).subscribe({
          next: (urun) =>{
            this.products.push({product: urun, amount: this.basket[i].ammount});
            if(this.products.length !== 0){
              this.isBasketEmpty = false;
            }
          }
        });
      }
    }
  }

  upAmount(id: number){
    for(let i= 0; i<= this.basket.length; i++){
      if(this.basket[i].productId == id){
        this.basket[i].ammount = this.basket[i].ammount + 1;
        localStorage.setItem("basket", JSON.stringify(this.basket))
      }
    }
  }

  downAmount(id: number){
    for(let i= 0; i<= this.basket.length; i++){
      if(this.basket[i].productId == id){
        this.basket[i].ammount = this.basket[i].ammount - 1;
        if(this.basket[i].ammount == 0){
          this.basket.splice(i)
      }
        localStorage.setItem("basket", JSON.stringify(this.basket))
      }
    }
  }

}
