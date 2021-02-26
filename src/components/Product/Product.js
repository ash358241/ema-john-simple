import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    console.log(props)
    const {name, img, seller, price, stock} = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
        <div>
            <h3 className='productName'>{name}</h3>
            <br/>
            <p><small>by: {seller}</small></p>
            <p>{price}</p>
            <p><small>Only {stock} left in stock - order soon!</small></p>
            <button className='mainButton' onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
        </div>
        </div>
    );
};

export default Product;