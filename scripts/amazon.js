import {cart,addToCart  } from '../data/cart.js';
/*
alternate
import * as cartModule from ;

cartModule.cart;
cartModule.addTocart('id');
*/
import {products} from '../data/products.js';

let html='';


products.forEach((product)=>{
    html+=`
         <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
             ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            Rs.${(product.price/100).toFixed(2)};
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-cart" data-id="${product.id}">
            Add to Cart
          </button>
        </div>

    `;

});

function updateCartQuantity(){
  let cartQuantity=0;

      cart.forEach((item)=>{
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-qunatity').innerHTML =cartQuantity;
}


document.querySelector('.js-products').innerHTML=html;

let q=0;

document.querySelectorAll('.js-cart').forEach((button)=>{
  button.addEventListener('click',()=>{

    const productId=button.dataset.productId;
    addToCart(productId);
    /*let i=0;

    for(i=0; i<cart.length; i++){
      if(cart[i].productId===button.dataset.id){
        cart[i].quanity++;
        console.log(cart);
        q++;
        document.querySelector('.js-qunatity').innerHTML = q;
        return;
      }
    }
    if(i===cart.length){
      cart.push({
        productId:button.dataset.id,
        quanity:1
      });
    
    }*/
    updateCartQuantity();
  })
})

