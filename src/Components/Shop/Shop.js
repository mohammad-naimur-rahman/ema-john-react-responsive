import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {

    const [products, setproducts] = useState([]);
    const [newPD, setnewPD] = useState([]);

    useEffect(() => {
        const first10 = fakeData.slice(0, 10);
        setproducts(first10);
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const pdKeys = Object.keys(savedCart);
        const prevCart = pdKeys.map(pdKey => {
            const product = fakeData.find(pd => pd.key === pdKey);
            product.quantity = savedCart[pdKey];
            return product;
        })
        setnewPD(prevCart);
    }, [])

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
            <div className="col-md-3">
                <Cart newPD={newPD}>
                    <Link to='/review'><button className="add-to-cart">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;