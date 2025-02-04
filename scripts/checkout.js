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
        console.log('Product Object:', object); // Log the product object

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
                                Quantity: <span class="quantity-label">${item.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
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

// Attach event listeners to the dynamically added elements
document.querySelectorAll('.js-delete').forEach((item) => {
    item.addEventListener('click', (event) => {
        const id = event.target.dataset.id;
        remove(id);// removing elements from the cart
        document.querySelector(`.js-${id}`).remove();
    });
});

