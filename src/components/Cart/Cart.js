import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    const total = cart.reduce((total, prd) => total+prd.price , 0);
    // let total = 0;
    // for(let i=0;i<cart.length;i++){
    //     const product = cart[i];
    //     total = total+product.price;
    // }
    let shipping = 0;
    
     if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }

    let tax = total/10;

    const grandTotal = (total + shipping + tax);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h3>Order Summary: </h3>
            <p>Items Ordered: {cart.length}</p>
            <p>Product price: {formatNumber(total)}</p>
            <p>Shipping cost: {shipping}</p>
            <p>Tax + VAT: {formatNumber(tax)}</p>
            <p>Total price: {formatNumber(grandTotal)}</p>
        </div>
    );
};

export default Cart;