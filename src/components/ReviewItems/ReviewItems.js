import React from 'react';

const ReviewItems = (props) => {
    const {name, quantity,key,price} = props.product;
    const itemStyle = {
        borderBottom: '1px solid lightgrey',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={itemStyle} className="review-item">
            <h3 className="product-name">{name}</h3>
            <p>Quantity: {quantity}</p>
            <p>${price}</p>
            <br/>
            <button onClick={() => props.removeProduct(key)} className="mainButton">Remove</button>
        </div>
    );
};

export default ReviewItems;