import { remove } from "../data/cart.js";
import { products } from "../data/products.js";
import { convert } from "./common_fuction/numberrounding.js";
import dayjs from 'https://esm.sh/dayjs';//esm module

const now = dayjs();
let free = now.add(7, 'day');
free = free.format('dddd, MMMM D');

let paid=now.add(3,'day');
paid=paid.format('dddd,MMMM D');

let fast=now.add(1,'day');
fast=fast.format('dddd,MMMM D');

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
                <div class="delivery-date js-delivery-${item.productId}">
                    Delivery date: ${free}
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
                    <div class="delivery-options js-radio" data-id=${item.productId}>
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input js-radio-${item.productId}" name="delivery-option-${item.productId}" data-r=1>
                            <div>
                                <div class="delivery-option-date js-date-1">
                                    ${free}
                                </div>
                                <div class="delivery-option-price">
                                    FREE Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input js-radio-${item.productId}" name="delivery-option-${item.productId}" data-r=2>
                            <div>
                                <div class="delivery-option-date js-date-2">
                                    ${paid}
                                </div>
                                <div class="delivery-option-price">
                                    $4.99 - Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input js-radio-${item.productId}" name="delivery-option-${item.productId}" data-r=3>
                            <div>
                                <div class="delivery-option-date js-date-3">
                                    ${fast}
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

document.querySelectorAll('.js-radio').forEach((item)=>{
    const id=item.dataset.id;
    let value;
    console.log(132);
    document.querySelectorAll(`.js-radio-${id}`).forEach((radio)=>{
        radio.addEventListener('click',(r)=>{
            if(radio.checked){
                //console.log(radio.checked);
                const check=radio.dataset.r;
                console.log(check);
                value=document.querySelector(`.js-date-${check}`).innerHTML;
                document.querySelector(`.js-delivery-${id}`).innerHTML=`Delivery date:${value}`;
            }
        })
    })    

});
