//localStorage.removeItem('cart');
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

let q=0;
export function cartAddition(id,value){ 
  q=Number(q)+Number(value);
  let i=0;

  for(i=0; i<cart.length; i++){
    if(cart[i].productId===id){
      cart[i].quantity++;
      console.log(cart);
      document.querySelector('.js-qunatity').innerHTML = q;
      break;
    }
  }
  if(i===cart.length){
    cart.push({
      productId:id,
      quantity:value
    });
  }
  document.querySelector('.js-qunatity').innerHTML = q;
  let sum=localStorage.setItem('cart', JSON.stringify(cart));
  //console.log(sum);
}


export function remove(id,cart){
  //console.log('Deleting product with ID:', id);
  //console.log("in cart file");
  //console.log(cart);
  let del=true;
  //if(cart.length==0) return;
  cart.forEach((cartItem)=>{
    if(cartItem.productId === id){
        let q=cartItem.quantity;
        if(q>1){
          cartItem.quantity=cartItem.quantity-1;
          del=false;
        }else if(q<=1){
            let newCart=[];
            cart.forEach((item)=>{
              if(item.productId!==id){
                newCart.push(item);
              }
            });
            cart=newCart;
        }
    }
  });
  //console.log(del);
  console.log("Cart after delet",cart);
  localStorage.setItem('cart', JSON.stringify(cart));
  return del;
}