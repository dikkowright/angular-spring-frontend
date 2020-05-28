import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.cartDetails();
  }

  cartDetails(){
    this.cartItems = this._cartService.cartItems;

    // Subscibe to the event
    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this._cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this._cartService.calculateTotalPrice();
  }
// Increment Quantity
  incrementQuantity(cartItem: CartItem){
    console.log('increment quantity', cartItem);
    this._cartService.addToCart(cartItem);
  }

  //Decrement Quatity
  decrementQuantity(cartItem: CartItem){
    this._cartService.decrementQuantity(cartItem)
  }


 }
