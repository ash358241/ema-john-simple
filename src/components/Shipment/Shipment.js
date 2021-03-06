import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        // console.log('form submitted', data);
        const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()}

        fetch('http://localhost:5000/addOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
          if(data == false){
            processOrder();
            alert('item added mamma')
          }
        })
    };
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <div className="text-center">
          <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
        <input className='ship-formInput' defaultValue={loggedInUser.name} name="name" ref={register({ required: true })} placeholder="Your Name" />
        {errors.name && <span className='error'>Name is required</span>}
        <br/>
        
        <input className='ship-formInput' defaultValue={loggedInUser.email} name="email" ref={register({ required: true })} placeholder="Your Email" />
        {errors.email && <span className='error'>Email is required</span>}
        <br/>
        
        <input className='ship-formInput' name="address" ref={register({ required: true })} placeholder="Your Address" />
        {errors.address && <span className='error'>Address is required</span>}
        <br/>
        
        <input className='ship-formInput' name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
        {errors.phone && <span className='error'>Phone Number is required</span>}
        <br/>
        <br/>
        <input type="submit" />
      </form>
      </div>
    );
};

export default Shipment;