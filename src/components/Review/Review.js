import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory();

    const handleProceedCheckOut = () => {
        history.push('/shipment');
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
    }

    //3rd
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    //1st
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

    },[]);

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }

    return (
        <div className='twin-container d-flex'>
            <div className='product-container'>
            <h3>Items: {cart.length}</h3>
            {/* 2nd */}
            {
                cart.map(pd =>  <ReviewItems key={pd.key} product={pd} removeProduct={removeProduct}></ReviewItems>)
            }
            {
                thankYou
            }
        </div>
        <div className='cart-container'>
            <Cart cart={cart}>
                <button onClick={handleProceedCheckOut} className='mainButton'>Proceed Checkout</button>
            </Cart>
        </div>
        
        </div>
    );
};

export default Review;