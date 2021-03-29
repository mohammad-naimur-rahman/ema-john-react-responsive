import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {

    const [products, setproducts] = useState([]);
    const [newPD, setnewPD] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setproducts(data));
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const pdKeys = Object.keys(savedCart);
        fetch('http://localhost:5000/productByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pdKeys)
        })
            .then(res => res.json())
            .then(data => setnewPD(data));
    }, []);

    const handleCart = (product) => {
        const sameProduct = newPD.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = newPD.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = ([...newPD, product])
        }
        setnewPD(newCart);
        addToDatabaseCart(product.key, count);
    }
    document.title = 'Shop | Ema John'

    return (
        <div className='row'>
            <div className="offset-lg-3"></div>
            <div className="col-md-6" style={{ borderRight: '1px solid lightgray' }}>
                {
                    products.length === 0 &&
                    <div className='d-flex align-items-center justify-content-center w-100 h-100'>
                        <div className="spinner-border text-primary" role="status">
                        </div>
                    </div>

                }
                {
                    products.map(product => <Product key={product.key} showAddToCartButton={true} pd={product} handleCart={handleCart} />)
                }
            </div>
            <div className="col-lg-3 col-md-6">
                <Cart newPD={newPD}>
                    <Link to='/review'><button className="add-to-cart">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;