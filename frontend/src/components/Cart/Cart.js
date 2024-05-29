import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../CartContext';
import './Cart.css';

function Cart() {
    const { cart, removeFromCart } = useContext(CartContext);
    const [quantities, setQuantities] = useState(cart.reduce((acc, item) => {
        acc[item.ProductID] = 1; // Default quantity is 1
        return acc;
    }, {}));

    const handleQuantityChange = (productId, quantity) => {
        setQuantities({
            ...quantities,
            [productId]: parseInt(quantity) // Ensure the quantity is an integer
        });
    };

    const getTotalPrice = (price, productId) => {
        return price * quantities[productId];
    };

    const calculateSubtotal = () => {
        return cart.reduce((acc, item) => acc + getTotalPrice(item.Price, item.ProductID), 0);
    };

    const calculateTax = (subtotal) => {
        const taxRate = 0.05; // 5% tax
        return subtotal * taxRate;
    };

    const calculateShipping = () => {
        const shippingFee = 10; // Flat shipping fee
        return shippingFee;
    };

    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const shipping = calculateShipping();
    const grandTotal = subtotal + tax + shipping;

    return (
        <>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <>
                    <div className='cart-labels'>
                        <p className='price-label'>Price</p>
                        <p className='quantity-label'>Quantity</p>
                        <p className='total-label'>Total</p>
                    </div>
                    {cart.map(data => (
                        <div className='cart' key={data.ProductID}>
                            <div className='cart-image'>
                                {data.Base64Image && <img src={data.Base64Image} alt="Product" />}
                            </div>
                            <div className='cart-name'>
                                <p>{data.Name}</p>
                            </div>
                            <div className='cart-price'>
                                <p>{data.Price}€</p>
                            </div>
                            <div className='cart-quantity'>
                                <input 
                                    className='input-quantity' 
                                    type="number"
                                    value={quantities[data.ProductID]}
                                    onChange={(e) => handleQuantityChange(data.ProductID, e.target.value)}
                                    min="1"
                                />
                            </div>
                            <div className='remove-btn'>
                                <button onClick={() => removeFromCart(data.ProductID)} className='remove-cart-btn'>REMOVE</button>
                            </div>
                            <div className='cart-total'>
                                <p>{getTotalPrice(data.Price, data.ProductID)}€</p>
                            </div>
                        </div>
                    ))}
                    <div className='checkout'>
                        <div className='checkout-totals'>
                            <p>Subtotal: {subtotal.toFixed(2)}€</p>
                            <p>Tax (5%): {tax.toFixed(2)}€</p>
                            <p>Shipping: {shipping.toFixed(2)}€</p>
                            <p>Grand Total: {grandTotal.toFixed(2)}€</p>
                        </div>
                        <button className='checkout-button'>Checkout</button>
                    </div>
                </>
            )}
        </>
    );
}

export default Cart;

