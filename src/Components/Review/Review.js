import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setcart] = useState([]);
    const [placedAlready, setplacedAlready] = useState(true);
    const [showing, setshowing] = useState(false);
    const history = useHistory();

    const removeProduct = pdKey => {
        const newCart = cart.filter(pd => pd.key !== pdKey);
        setcart(newCart);
        removeFromDatabaseCart(pdKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const pdKeys = Object.keys(savedCart);

        fetch('https://blooming-oasis-89364.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pdKeys)
        })
            .then(res => res.json())
            .then(data => setcart(data));
    }, [])

    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    document.title = 'Review page';


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
                    showing && <h2 className='text-center my-3 text-success'>Your order has been placed for shipping!<br />Thank you!!!</h2>
                }
            </div>
            <div className="col-lg-3 col-md-6">
                <Cart newPD={cart}>
                    <button className="add-to-cart" onClick={handleProceedCheckout}>Proceed checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;