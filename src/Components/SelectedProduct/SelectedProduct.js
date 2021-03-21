import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const SelectedProduct = () => {
    const { pdKEY } = useParams();
    const product = fakeData.find(pd => pd.key === pdKEY);

    document.title = product.name;

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