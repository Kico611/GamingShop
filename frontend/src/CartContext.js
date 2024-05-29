import React, { createContext, useReducer, useEffect } from 'react';

// Create a context for the cart
export const CartContext = createContext();

// Define the cart reducer function to handle state changes
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload];
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.ProductID !== action.payload);
        default:
            return state;
    }
};

// Define the CartProvider component that will provide cart state and actions to its children
export const CartProvider = ({ children }) => {
    // Use the useReducer hook to manage the cart state
    const [cart, dispatch] = useReducer(cartReducer, []);

    // Define a function to handle adding an item to the cart
    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    // Define a function to handle removing an item from the cart
    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    // Provide the cart state and actions to the children of this component
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

