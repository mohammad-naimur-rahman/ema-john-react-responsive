import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const SelectedProduct = () => {
    const { pdKEY } = useParams();
    const [product, setproduct] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/product/' + pdKEY)
            .then(res => res.json())
            .then(data => setproduct(data[0]))
    }, [pdKEY])

    document.title = product.name;
    console.log(product);

    return (
        <div>
            {
                product.length === 0 && <div className='d-flex align-items-center justify-content-center w-100 h-100'>
                    <div className="spinner-border text-primary" role="status">
                    </div>
                </div >
            }
            {
                product.length !== 0 && <Product showAddToCartButton={false} pd={product} />
            }
        </div>
    );
};

export default SelectedProduct;