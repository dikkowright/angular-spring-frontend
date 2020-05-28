import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 


  cartItems: CartItem[] =[];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem){
   //check if the book/item is already in the cart 
   let alreadyExistsInCart: boolean = false;
   let existingCartItem: CartItem = undefined;
   
   if (this.cartItems.length > 0){
     //find the book/item in the cart based on the id
     existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
     alreadyExistsInCart = (existingCartItem != undefined)

   }

   if (alreadyExistsInCart) {
     //increment the quatity
     existingCartItem.quatity++;
   }else{
     //add to the cart item array
     this.cartItems.push(theCartItem);
   }
   
   this.calculateTotalPrice();

  }
  calculateTotalPrice() {

    let totalPriceValue: number  = 0
    let totalQuatityValue: number = 0
    
    // Calculate the total price and total quatity
    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quatity * currentCartItem.unit_price;
      totalQuatityValue += currentCartItem.quatity;
 }
   
    console.log(`total price: ${totalPriceValue},total quantity: ${totalQuatityValue}`);

    //publish the events
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuatityValue);
    
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quatity--;

    if (cartItem.quatity === 0){
      this.remove(cartItem);
    }else{
      this.calculateTotalPrice();
    }

   }

  remove(cartItem: CartItem){
    const itemIdex = this.cartItems.findIndex((tempCartItem) => tempCartItem.id === cartItem.id);

    if(itemIdex > -1){
      this.cartItems.splice(itemIdex, 1);
      this.calculateTotalPrice();
    }
  }

}
