import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setloggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetail = { ...loggedInUser, products: savedCart, shipment: data, orderTIme: new Date() };

        fetch('https://blooming-oasis-89364.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetail)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('Your order placed successfully')
                }
            })
    };

    document.title = 'Shipment';
    //console.log(watch("example"));

    return (
        < form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '500px' }} className='shadow-lg p-5 m-5 rounded mx-auto'>
            <h3 className='text-success'>Process order</h3>
            < input name="name" defaultValue={loggedInUser.name} placeholder='Full name' ref={register({ required: true })} className='form-control' />
            { errors.name && <span>This field is required</span>}
            <br />
            < input name="email" defaultValue={loggedInUser.email} placeholder='Email address' ref={register({ required: true })} className='form-control' />
            { errors.email && <span>This field is required</span>}
            <br />
            < input name="phone" placeholder='Phone number' ref={register({ required: true })} className='form-control' />
            { errors.phone && <span>This field is required</span>}
            <br />
            < input name="address" placeholder='Your address' ref={register({ required: true })} className='form-control' />
            { errors.address && <span>This field is required</span>}
            <br />
            <input type="submit" className='btn btn-success px-5' />
        </form >
    );
};

export default Shipment;