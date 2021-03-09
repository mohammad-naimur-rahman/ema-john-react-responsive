import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ pd, showAddToCartButton, handleCart }) => {
    const { img, name, seller, price, stock, key } = pd;
    return (
        <div className="product">
            <img src={img} alt="" />
            <div className="product-details">
                <Link to={`/product/${key}`}><p className="pd-name">{name}</p></Link>
                <p>by: {seller}</p>
                <p className="pd-price">$ {price}</p>
                <p><small>Only {stock} left in stock - <br /> Order soon</small></p>
                {
                    showAddToCartButton && <button onClick={() => { handleCart(pd) }}> Add to cart</button>
                }
            </div>
        </div>
    );
};

export default Product;