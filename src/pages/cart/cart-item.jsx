import React from "react";
import propTypes from "prop-types";
import { useCartActions } from "../../context/";
import "./cart-item.css";

export const CartItem = ({ product = null }) => {
  const { id, productName, price, productImage } = product;
  const { cartActions, cartDetails } = useCartActions();
  const { addToCart, removeFromCart, updateCartItemCount } = cartActions;
  const { cartItems } = cartDetails;

  return (
    <div className="cartItem">
      <img
        src={require(`../../assets/products/${productImage}`)}
        alt={productName}
      />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  product: propTypes.shape({
    id: propTypes.number,
    productName: propTypes.string,
    price: propTypes.number,
    productImage: propTypes.string,
  }).isRequired,
};
