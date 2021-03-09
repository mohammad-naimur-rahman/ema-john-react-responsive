import React from 'react';

const Cart = ({ newPD, children }) => {

    const totalPrice = newPD.reduce((total, newPD) => total + (newPD.price * newPD.quantity), 0);

    const fixVal = val => {
        const intVal = parseFloat(val);
        const fixedVal = intVal.toFixed(2);
        return fixedVal;
    }

    let shipping = 0;
    if (fixVal(totalPrice) > 0 && fixVal(totalPrice) < 15) {
        shipping = 12.99;
    } else if (fixVal(totalPrice) >= 15 && fixVal(totalPrice) < 35) {
        shipping = 4.99;
    } else if (fixVal(totalPrice) >= 35) {
        shipping = 0;
    }

    const tax = fixVal(fixVal(totalPrice) * .1);
    return (
        <div>
            <h4>Order Summary</h4>
            <p><b>Items ordered: </b>{newPD.length}</p>
            <p><b>Product Price: </b>$ {fixVal(totalPrice)}</p>
            <p><b>Shipping charge: </b>$ {fixVal(shipping)}</p>
            <p><b>Tax: </b>$ {tax}</p>
            <p><b>Total price: </b>$ {fixVal(totalPrice + shipping + tax)}</p>
            {
                children
            }
        </div>
    );
};

export default Cart;