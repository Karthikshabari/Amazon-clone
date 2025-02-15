import { products} from "../data/products.js";
import dayjs from 'https://esm.sh/dayjs';//esm module
let savedCart=[];
console.log(find(1));


window.addEventListener('click',()=>{
    if(!savedCart){
        console.log("No items");
    }
    else{
        savedCart=JSON.parse(localStorage.getItem('savedInfo')) || 0;
    }
});

function loadItem(){
    document.querySelector('.q').innerHTML=noOfItem;
}

let noOfItem=0;
if(!savedCart){
    console.log("No itms");
}
else{
    savedCart=JSON.parse(localStorage.getItem('savedInfo')) || 0;
}

let htmlBody='';

let htmlheader='';

let htmlTotal=JSON.parse(localStorage.getItem('prevHtml')) || '';


function find(productId) {
    let index = -1; 
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            index = i;
            break;
        }
    }
    //console.log('Product ID:', productId, 'Index:', index); 
    return index;
}


console.log("Savedcart",savedCart);
if(savedCart){
    savedCart.forEach((order)=>{
        const date=order[0];
        const id=order[1][0].productId;
        const totalPrice=order[2];
        const totalQuantity=order[3];
        console.log(date,id,totalPrice,totalQuantity);
        console.log("Cart",order);
        noOfItem=noOfItem+order[1].length;
        htmlheader=`
    <div class="order-header">
        <div class="order-header-left-section">
            <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${date}</div>
            </div>
            <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${totalPrice}</div>
            </div>
        </div>
    
        <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${id+1045030400}</div>
        </div>
    </div>`;
    
    const index=find(id);
    const product=products[index];
    console.log(product);
    let arrival;
    if(totalQuantity==1)
        arrival=dayjs(order[0]).add(7,'day').format('dddd, MMMM D');
    else if(totalQuantity==2)
        arrival=dayjs(order[0]).add(3,'day').format('dddd, MMMM D');
    else
        arrival=dayjs(order[0]).add(1,'day').format('dddd, MMMM D');
    
    order[1].forEach((eachItem)=>{
    htmlBody+=`
    <div class="order-details-grid">
        <div class="product-image-container">
            <img src="${product.image}">
        </div>
    
        <div class="product-details">
            <div class="product-name">
            ${product.name}
            </div>
            <div class="product-delivery-date">
            Arriving on: ${arrival}
            </div>
            <div class="product-quantity">
            
            </div>
            <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
            </button>
        </div>
    
        <div class="product-actions">
            <a href="tracking.html">
            <button class="track-package-button button-secondary">
                Track package
            </button>
            </a>
        </div>
    </div>
        `;
    });
    
    htmlTotal+=`<div class="order-container">
    ${htmlheader} ${htmlBody}
    </div>`;
    });
}


loadItem();
console.log("total",htmlTotal);
if(htmlTotal){
    let a=localStorage.setItem('prevHtml',JSON.stringify(htmlTotal));
    const savedHtml = JSON.parse(localStorage.getItem('prevHtml'));
console.log("Saved HTML", savedHtml);
}

document.querySelector('.js-orderPage').innerHTML=htmlTotal;

localStorage.removeItem('savedInfo');

//localStorage.clear();

