export let cart = JSON.parse(localStorage.getItem('cart')) || [];

let q=0;
export function cartAddition(id,value){ 
  console.log(q);
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
      quantity:1
    });
  }
  document.querySelector('.js-qunatity').innerHTML = q;
  let sum=localStorage.setItem('cart', JSON.stringify(cart));
  console.log(sum);
}


export function remove(id){
  //console.log('Deleting product with ID:', id);
  const newCart=[];
  cart.forEach((cartItem)=>{

      if(cartItem.productId !== id){
          newCart.push(cartItem);
      }

  });
  console.log(cart);
  cart=newCart;
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(cart);
}