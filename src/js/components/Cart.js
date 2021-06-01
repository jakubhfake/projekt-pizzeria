import {settings, select, classNames, templates} from '../settings.js';
import utils from '../utils.js';
import CartProduct from './CartProduct.js';

class Cart {
  constructor(element) {
    const thisCart = this;
    thisCart.products = [];
    thisCart.getElements(element);
    thisCart.initActions();
    //console.log('thisCart.products', thisCart.products); 
  }

  initActions() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', function (event) {
      event.preventDefault();
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updated', function(){
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function(event) {
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisCart.sendOrder();
    });
  }

  getElements(element) {
    const thisCart = this;
    thisCart.dom = {};
    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);
    thisCart.dom.deliveryFee = thisCart.dom.wrapper.querySelector(select.cart.deliveryFee);
    thisCart.dom.subTotalPrice = thisCart.dom.wrapper.querySelector(select.cart.subtotalPrice);
    thisCart.dom.totalPrice = thisCart.dom.wrapper.querySelectorAll(select.cart.totalPrice);
    thisCart.dom.totalNumber = thisCart.dom.wrapper.querySelector(select.cart.totalNumber);
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);
    thisCart.dom.address = thisCart.dom.wrapper.querySelector(select.cart.address);

  }

  add(menuProduct) {
    const thisCart = this;
    const generatedHTML = templates.cartProduct(menuProduct);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisCart.dom.productList.appendChild(generatedDOM);
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    thisCart.update();
  }

  update() {
    const thisCart = this;
    let deliveryFee = settings.cart.defaultDeliveryFee;
    thisCart.totalNumber = 0;
    thisCart.subTotalPrice = 0;
    
    for (let product of thisCart.products) {
      thisCart.totalNumber += product.amount;
      thisCart.subTotalPrice += product.price;
    }

    if (thisCart.totalNumber !== 0 ) {
      thisCart.totalPrice = thisCart.subTotalPrice + deliveryFee;
      thisCart.dom.deliveryFee.innerHTML = deliveryFee;
      thisCart.dom.totalNumber.innerHTML = thisCart.totalNumber;
      thisCart.dom.subTotalPrice.innerHTML = thisCart.subTotalPrice;
      for(let cartTotalPrice of thisCart.dom.totalPrice){
        cartTotalPrice.innerHTML = thisCart.totalPrice;
      }
        
    }
    else {
      thisCart.totalPrice = 0;
      deliveryFee = 0;
    }
  }
  remove(cartProduct) {
    const thisCart = this;

    cartProduct.dom.wrapper.remove();
    const indexOfProduct = thisCart.products.indexOf(cartProduct);
    const productRemovedValues = thisCart.products.splice(indexOfProduct, 1);
    console.log('Removed product from array', productRemovedValues);
    thisCart.update();
  }
  sendOrder() {
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.orders;
    const payload = {
      address: thisCart.dom.address.value,
      phone: thisCart.dom.phone.value,
      totalPrice: thisCart.totalPrice,
      subTotalPrice: thisCart.subTotalPrice,
      totalNumber: thisCart.totalNumber,
      deliveryFee: thisCart.deliveryFee,
      products: [],
    };
    for(let prod of thisCart.products) {
      payload.products.push(prod.getData());
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
      
    fetch(url, options)
      // .then nie jest potrzebne
      .then(function(response) {
        return response.json();
      })
      .then(function(parsedResponse) {
        console.log('parsedResponse', parsedResponse);
      });

    console.log('Order', payload);
    console.log('url', url);
  }
}
export default Cart;