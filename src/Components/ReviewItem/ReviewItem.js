import React from 'react';
import { Link } from 'react-router-dom';

const ReviewItem = ({ pd, removeProduct }) => {
    const { img, name, seller, price, quantity, key } = pd;
    return (

        <div className="product">
            <img src={img} alt="" />
            <div className="product-details">
                <Link to={`/product/${key}`}><p className="pd-name">{name}</p></Link>
                <p>by: {seller}</p>
                <p className="pd-price">$ {price}</p>
                <p><b>Quantity: </b>{quantity}</p>
                <button onClick={() => removeProduct(key)}>Remove Item</button>
            </div>
        </div>
    );
};

export default ReviewItem;