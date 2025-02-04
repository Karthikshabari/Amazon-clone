import { remove } from "../data/cart.js";
import { products } from "../data/products.js";
import { convert } from "./common_fuction/numberrounding.js";


const cart = JSON.parse(localStorage.getItem('cart')) || [];

console.log('Cart:', cart); // Log the cart to verify items are retrieved
console.log('Products:', products); // Log the products array

function find(productId) {
    let index = -1; // Initialize with -1 to indicate not found
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            index = i;
            break;
        }
    }
    console.log('Product ID:', productId, 'Index:', index); // Log the productId and index
    return index;
}

let html = '';

cart.forEach((item) => {
    let index = find(item.productId); // Pass the productId to the find function
    if (index !== -1) {
        let object = products[index];
        //console.log('Product Object:', object); // Log the product object

        html += `
            <div class="cart-item-container js-${item.productId}" data-product-id="${item.productId}">
                <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                </div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${object.image}">
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${object.name}
                        </div>
                        <div class="product-price">
                            $${convert(object.price)}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label js-change-${item.productId}">${item.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update" data-id="${item.productId}" >
                                Update
                            </span>
                            <span class="js-inputbox"></span>
                            <span class="delete-quantity-link link-primary js-delete" data-id="${item.productId}">
                                Delete
                            </span>
                            
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-${item.productId}">
                            <div>
                                <div class="delivery-option-date">
                                    Tuesday, June 21
                                </div>
                                <div class="delivery-option-price">
                                    FREE Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-${item.productId}">
                            <div>
                                <div class="delivery-option-date">
                                    Wednesday, June 15
                                </div>
                                <div class="delivery-option-price">
                                    $4.99 - Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-${item.productId}">
                            <div>
                                <div class="delivery-option-date">
                                    Monday, June 13
                                </div>
                                <div class="delivery-option-price">
                                    $9.99 - Shipping
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});

document.querySelector('.js-order').innerHTML = html;
let quantity=0;

console.log("Before");
console.log(cart);

// Attach event listeners to the dynamically added elements
document.querySelectorAll('.js-delete').forEach((item) => {
    item.addEventListener('click', (event) => {
        const id = event.target.dataset.id;
        let del=remove(id);// removing elements from the cart
        if(del){
            document.querySelector(`.js-${id}`).remove();
            quantity=quantity-1;
        }
        if(!del){
            const val=document.querySelector(`.js-change-${id}`).innerHTML;
            document.querySelector(`.js-change-${id}`).innerHTML=val-1;
            quantity=quantity-1;
        }
    document.querySelector('.js-checkout').innerHTML=`${quantity}`;
    });
});


cart.forEach((item)=>{
    quantity+=Number(item.quantity);
});

document.querySelector('.js-checkout').innerHTML=`${quantity}`;

let saveHtml=   `<span> <input type="textbox" class="text input"> 
    <p class="text save">Save</p>
<span>`;


document.querySelectorAll('.js-update').forEach((item)=>{
    item.addEventListener('click',(event)=>{
        const id=event.target.dataset.id;
        //console.log("Hi"+id);
        //console.log(cart);
        document.querySelector('.js-inputbox').innerHTML=saveHtml;
        document.querySelector('.save').addEventListener('click',()=>{
            //console.log("Befire"+localStorage.getItem('cart'));
            let value=document.querySelector('.input').value;
            cart.forEach((cartItem)=>{
                if(cartItem.productId===id){
                    cartItem.quantity=value;
                }
            });
            console.log(cart);
            localStorage.setItem('cart',JSON.stringify(cart));
            let quantity=Number(0);
            cart.forEach((item)=>{
            quantity+=Number(item.quantity);
            });
            document.querySelector('.js-checkout').innerHTML=`${quantity}`;

            document.querySelector(`.js-change-${id}`).innerHTML=value;//check
            //console.log(localStorage.getItem('cart'));
            document.querySelector('.js-inputbox').innerHTML=``;
        });
    });
});


