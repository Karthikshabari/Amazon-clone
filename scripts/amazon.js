import {cart, cartAddition} from '../data/cart.js';
/*
alternate
import * as cartModule from ;

cartModule.cart;
cartModule.addTocart('id');
*/
import {products} from '../data/products.js';
import { convert } from './common_fuction/numberrounding.js';

let html='';

/*window.addEventListener('load',()=>{
  localStorage.removeItem('cart');
});
*/
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
            Rs.${convert(product.price)};
          </div>

          <div class="product-quantity-container">
            <select class="js-container-${product.id}">
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

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>

    `;

});

document.querySelector('.js-products').innerHTML=html;

let timeid=null;

document.querySelectorAll('.js-cart').forEach((button)=>{
  button.addEventListener('click',()=>{
    const productId=button.dataset.productId;
    let value=document.querySelector(`.js-container-${productId}`).value;
    cartAddition(productId,value);
    document.querySelector(`.js-added-${productId}`).classList.add('added');
    if(timeid){
      clearTimeout(timeid);
    }
    timeid=setTimeout(()=>{
      document.querySelector(`.js-added-${productId}`).classList.remove('added');
    },1000);
  })
})






