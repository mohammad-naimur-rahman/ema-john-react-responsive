import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const SelectedProduct = () => {
    const { pdKEY } = useParams();
    const product = fakeData.find(pd => pd.key === pdKEY);

    return (
        <div>
            <Product showAddToCartButton={false} pd={product} />
        </div>
    );
};

export default SelectedProduct;