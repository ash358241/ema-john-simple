// import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
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
    }, [])
    
    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;

        const sameProduct = cart.find(pd => pd.key == toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd =>pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }

        // const count = sameProduct.length;
        // const newCart = [...cart, product];
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product key={pd.key} showAddToCart={true} product={pd} handleAddProduct={handleAddProduct}></Product>)
                }
            </div>
            <div className="cart-container"> 
                <Cart cart={cart}>
                <Link to="/review">
            <button className="mainButton">Review Order</button>
            </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;