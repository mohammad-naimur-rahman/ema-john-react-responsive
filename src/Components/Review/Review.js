import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import happyFace from '../../images/giphy.gif';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setcart] = useState([]);
    const [placedAlready, setplacedAlready] = useState(true);
    const [showing, setshowing] = useState(false);

    const removeProduct = pdKey => {
        const newCart = cart.filter(pd => pd.key !== pdKey);
        setcart(newCart);
        removeFromDatabaseCart(pdKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const pdKeys = Object.keys(savedCart);
        const prevCart = pdKeys.map(pdKey => {
            const product = fakeData.find(pd => pd.key === pdKey);
            product.quantity = savedCart[pdKey];
            return product;
        })
        setcart(prevCart);
    }, [])

    const placeOrder = () => {
        processOrder();
        setcart([]);
        setplacedAlready(false);
        setshowing(true);
    }


    return (
        <div className='row'>
            <div className="offset-lg-3"></div>
            <div className="col-md-6" style={{ borderRight: '1px solid lightgray' }}>
                {
                    placedAlready && <h1>Cart items: {cart.length}</h1>
                }
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeProduct={removeProduct} pd={pd} />)
                }
                {
                    showing && <img src={happyFace} alt="" />
                }
            </div>
            <div className="col-md-3">
                <Cart newPD={cart}>
                    <button className="add-to-cart" onClick={placeOrder}>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;