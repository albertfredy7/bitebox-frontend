// File: src/atoms/cartAtom.js

import { atom } from 'jotai';

// Atom to store the cart items
export const cartItemsAtom = atom([]);

// Atom to calculate the total price of items in the cart
export const cartTotalAtom = atom((get) =>
  get(cartItemsAtom).reduce((total, item) => total + item.price * item.quantity, 0)
);

// Function to remove an item from the cart
export const removeFromCartAtom = atom(
  null,
  (get, set, itemId) => {
    const updatedCart = get(cartItemsAtom).filter((item) => item.id !== itemId);
    set(cartItemsAtom, updatedCart);
  }
);
