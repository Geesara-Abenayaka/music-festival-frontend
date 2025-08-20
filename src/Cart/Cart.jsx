import React, { useEffect, useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import './Cart.css';
import axios from 'axios';
import { BACKEND_BASE } from '../config';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, []);

 
  const clearCart = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
  };


  const reduceQuantity = (indexToUpdate) => {
    const updatedItems = [...cartItems];

    if (updatedItems[indexToUpdate].quantity > 1) {
      updatedItems[indexToUpdate].quantity -= 1;
    } else {
      updatedItems.splice(indexToUpdate, 1);
    }

    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

 
  const proceedToCheckout = async () => {
    const userId = localStorage.getItem("token"); 
    if (!userId) {
      alert("No items in cart or user not logged in");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
     
      await axios.post(`${BACKEND_BASE}users/checkout`, {
        userId,
        cartItems
      });

      
      localStorage.removeItem('cartItems');
      setCartItems([]);
      alert("Checkout successful!");
    } catch (err) {
      console.error(err);
      alert("Error during checkout");
    }
  };

  return (
    <div className='editshows1 cartShift'>
      <div className='vijaya'>
        <div className='pendingshows'>Your Pending Shows</div>
        <button onClick={clearCart} className='clearcartbtn'>Clear</button>
      </div>

      <div className='wanttoflex'>
        <div className='showname'>Shows</div>
        <div className='othershowdet'>Ticket Price</div>
        <div className='othershowdet'>No.Spots</div>
        <div className='othershowdet'>Total</div>
      </div>

      {cartItems.map((item, index) => (
        <div key={index} className='wanttoflex2'>
          <div className='showname'>
            <img src={item.image} alt={item.name} width="50" style={{ marginRight: '8px' }} />
            <div className='havesamespace'>{item.name + " at " + item.time}</div>
          </div>

          <div className='othershowdet1'>{item.price}</div>
          <div className='othershowdet2'>{item.quantity}</div>
          <div className='othershowdet3'>{item.price * item.quantity}</div>
          <div className='othershowdet'>
            <IoMdCloseCircle className='removeItemBtn' onClick={() => reduceQuantity(index)} />
          </div>
        </div>
      ))}

      <div className='getbtn'>
        <button className='checkoutbtn' onClick={proceedToCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
