export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId){
    let matchingItem;
    cart.forEach((item)=>{
      if(productId=== item.productId){
          matchingItem=item;
      }});
      if(matchingItem){
        matchingItem.quantity +=1;
      }
      else{
        cart.push({
          productId: productId,
          quantity:1
        })
      }
      let sum=localStorage.setItem('cart', JSON.stringify(cart));
      console.log(sum);
}


export function remove(id){
  console.log('Deleting product with ID:', id);
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