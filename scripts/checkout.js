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

let cart = JSON.parse(localStorage.getItem('cart')) || [];

console.log('Cart:', cart); // Log the cart to verify items are retrieved
//console.log('Products:', products); // Log the products array

function find(productId) {
    let index = -1; // Initialize with -1 to indicate not found
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            index = i;
            break;
        }
    }
    //console.log('Product ID:', productId, 'Index:', index); // Log the productId and index
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
                            Rs.${convert(object.price)}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label js-change-${item.productId}">${item.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update" data-id="${item.productId}" >
                                Update
                            </span>
                            <span class="js-inputbox-${item.productId}"></span>
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
                            <input type="radio" class="delivery-option-input js-radio-${item.productId}" name="delivery-option-${item.productId}" data-r=1 data-itemid=${item.productId}>
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
                            <input type="radio" class="delivery-option-input js-radio-${item.productId}" name="delivery-option-${item.productId}" data-r=2 data-itemid=${item.productId}>
                            <div>
                                <div class="delivery-option-date js-date-2">
                                    ${paid}
                                </div>
                                <div class="delivery-option-price">
                                    Rs.100 - Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input js-radio-${item.productId}" name="delivery-option-${item.productId}" data-r=3 data-itemid=${item.productId}>
                            <div>
                                <div class="delivery-option-date js-date-3">
                                    ${fast}
                                </div>
                                <div class="delivery-option-price">
                                    Rs 150 - Shipping
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

//console.log("Before");
//console.log(cart);


// Attach event listeners to the dynamically added elements
document.querySelectorAll('.js-delete').forEach((item) => {
    item.addEventListener('click', (event) => {
        console.log("in delete ");
        const id = event.target.dataset.id;
        let del=remove(id,cart);// removing elements from the cart
        cart=JSON.parse(localStorage.getItem('cart')) || 0;
        console.log("cart in checkout",cart);
        //cart=c;
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
    console.log("calling shipping in delete");  
    
    //updatePrice();
    });
});


cart.forEach((item)=>{
    quantity+=Number(item.quantity);
});

document.querySelector('.js-checkout').innerHTML=`${quantity}`;

let saveHtml=   `<span> <input type="textbox" class="text input"> 
    <button class="text save" style="width:50px;">Save</button>
<span>`;


document.querySelectorAll('.js-update').forEach((item)=>{
    item.addEventListener('click',(event)=>{
        const id=event.target.dataset.id;
        //console.log("Hi"+id);
        //console.log(cart);
        document.querySelector(`.js-inputbox-${id}`).innerHTML=saveHtml;
        document.querySelector('.save').addEventListener('click',()=>{
            //console.log("Befire"+localStorage.getItem('cart'));
            let value=document.querySelector('.input').value;
            let existing=document.querySelector(`.js-change-${id}`).innerHTML;
            if(existing!==value){
                quantity=0;
                cart.forEach((cartItem)=>{
                    if(cartItem.productId===id){
                        cartItem.quantity=value;
                    }
                });
                //console.log(cart);
                localStorage.setItem('cart',JSON.stringify(cart));
    
                //updating checkout after updation
                cart.forEach((item)=>{
                    quantity+=Number(item.quantity);
                });
                document.querySelector('.js-checkout').innerHTML=`${quantity}`;
    
                document.querySelector(`.js-change-${id}`).innerHTML=value;//check
                //console.log(localStorage.getItem('cart'));
            }
            document.querySelector(`.js-inputbox-${id}`).innerHTML=``;
            updatePrice();
        });
    });
});

let itemQunaity= 0;
let arr=[];
let shippingCost=[];


//updateShippingCart();
//JSON.parse(localStorage.getItem('cartDisplay')) ||    
let cartDisplay= JSON.parse(localStorage.getItem('cartDisplay')) || 0;

function storeOldRadio(temp){
    if(temp==undefined){
        return JSON.parse(localStorage.getItem('storeOld'));
    }
    localStorage.setItem('storeOld',JSON.stringify(temp));
}
document.querySelectorAll('.js-radio').forEach((item)=>{
    const id=item.dataset.id;
    let value;
    //console.log("Id");
    //console.log(id);
    //console.log(132);
    document.querySelectorAll(`.js-radio-${id}`).forEach((radio)=>{
        radio.addEventListener('click',(r)=>{
            //itemQunaity=findUnique(itemQunaity,);
            if(radio.checked){
                //console.log(radio.checked);
                const selected=radio.dataset.itemid;
                //console.log(selected);
                itemQunaity=findUnique(itemQunaity,arr,selected);
                //console.log("Counting");
                //console.log(itemQunaity);
                const check=radio.dataset.r;
                const tempShipping=[];
                tempShipping.push(id);
                tempShipping.push(check);
                const newOrOld=updateShippingCost(tempShipping);
                if(newOrOld===0){
                    storeOldRadio(tempShipping[1]);
                }
                else if(newOrOld===1){
                    storeOldRadio(-1);
                }
                //console.log("Shippingcart",shippingCost);
                value=document.querySelector(`.js-date-${check}`).innerHTML;
                //console.log("Value");
                //console.log(check);
                document.querySelector(`.js-delivery-${id}`).innerHTML=`Delivery date:${value}`;
                updatePrice();
            }
            console.log("Shiiping cost",shippingCost);
            const itemQ=noOfItem(cart);
            //console.log("Item qu");
            //console.log(itemQunaity);
            //console.log("cart q");
            //console.log(itemQ);
            if(itemQ===itemQunaity){
                localStorage.setItem('itemq',JSON.stringify(itemQunaity));
                //console.log("removing");
                cartDisplay=1;
                localStorage.setItem('cartDisplay',JSON.stringify(cartDisplay));
                console.log(cartDisplay);
                toStorePreviousCartValue(itemQ);
                displayOrder();
                updatePrice();
            }
        })
    })    

});

function updateShippingCost(temp){
    if(shippingCost.length==0){
        shippingCost.push(temp);
        return 1;
    }else{
        let found=false;
        console.log("in else");
        shippingCost.forEach((array)=>{
            console.log("array",array);
            if(temp[0]===array[0]){
                array[1]=temp[1];
                found=true;
            }
        });
        if(!found){
            shippingCost.push(temp);
        }
        return 0;
    }
}



//console.log("Check");
//console.log(cart);




function toStorePreviousCartValue(value){
    let cartValue=JSON.parse(localStorage.getItem('preivousvalue'))||0;
    localStorage.setItem('preivousvalue',JSON.stringify(value));
    return cartValue;
}



function displayOrder(count){
    //console.log("removing");
    //console.log(cartDisplay);
    const currenCartQ=noOfItem(cart);
    const preivousvalue=count || toStorePreviousCartValue(0);
    //console.log("Hi",preivousvalue);
    toStorePreviousCartValue(preivousvalue);
    if(currenCartQ>preivousvalue) cartDisplay=0;
    if(cartDisplay===1 && preivousvalue===currenCartQ)
        document.querySelector('.payment-summary').classList.remove('order-css');
}

window.addEventListener('load',()=>{
    const itemQ=toStorePreviousCartValue(0);
    //console.log("Loadidn");
    //console.log(itemQ);
    updatePrice();
    displayOrder(itemQ);
})

function findUnique(count,arr,id){
    if(arr.length==0){
        arr.push(id);
        count=count+1;
        return count;
    }else{
        let bol=false;
        arr.forEach((eachId)=>{
            if(eachId===id){
                bol=true;
            }
        });
        if(!bol){
            arr.push(id);
            count=count+1;
            return count;
        }
    }

    return count;
}

function noOfItem(cart){
    let c=0;
    cart.forEach(item=>c++);
    return c;
}


function updatePrice(){
    if(cart.length==0){
        document.querySelector('.js-item-cost').innerHTML='Rs.0';
        document.querySelector('.js-shipping-cost').innerHTML='Rs.0';

    }else{
        let totalItemPrice=0;
    //this for items
    cart.forEach((item)=>{
        const id=item.productId;
        const quantity=item.quantity;
        const index=find(id);
        const singleItem=products[index];
        //console.log(singleItem);
        totalItemPrice=totalItemPrice+singleItem.price*quantity;
        //console.log("price");
        //console.log(totalItemPrice);
        document.querySelector('.js-item-cost').innerHTML=`Rs.${convert(totalItemPrice)}`;
    });


    //this if for shiping cost
    let shippingCharge=0;
    const first=0;
    const second=100;
    const third=150;
    
    let alreadyExist=[];
    shippingCost.forEach((array)=>{
        if(alreadyExist.length==0){
            const type=array[1];
            alreadyExist.push(array[0]);
            if(type==2) shippingCharge=shippingCharge+second;
            else if(type==3) shippingCharge=shippingCharge+third;
        }
        else{
            let newELement=true;
            alreadyExist.forEach((id)=>{
                if(id===array[0]){
                    const type=array[1];
                    if(type==2) shippingCharge=shippingCharge+second;
                    else if(type==3) shippingCharge=shippingCharge+third;
                    newELement=false;
            }});
            if(newELement){
                const type=array[1];
                alreadyExist.push(array[0]);
                if(type==2) shippingCharge=shippingCharge+second;
                else if(type==3) shippingCharge=shippingCharge+third;
            }
        }
    });

    document.querySelector('.js-shipping-cost').innerHTML=`Rs.${shippingCharge}`;

    let costAfterShipping=0;
    costAfterShipping=Number(convert(totalItemPrice))+Number(shippingCharge);
    
    document.querySelector('.js-after-shipping').innerHTML=`Rs.${costAfterShipping}`;

    const tax=costAfterShipping+(costAfterShipping/5);
    document.querySelector('.js-tax').innerHTML=`Rs.${(costAfterShipping/5).toFixed(2)}`;

    document.querySelector('.js-total').innerHTML=`Rs.${tax}`;


    }
}