import React, { useMemo } from "react";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import orderIdGenerator from "../../helpers/orderIdGenerator";
import calculateRewardPoints from "../../helpers/calculateRewardPoints";
import { useRewardDetails, useCartActions, useProductDetails, useOrderActions } from "../../context/";
import "./cart.css";
export const Cart = () => {
  const { cartDetails, cartActions } = useCartActions();
  const { orderActions } = useOrderActions();
  const { productDetails } = useProductDetails();
  const { rewardDetails } = useRewardDetails();
  const { cartItems, totalItemsInCart } = cartDetails;
  const { getTotalCartAmount } = cartActions;
  const { setTotalOrders, setOrderId } = orderActions;
  const { totalProducts } = productDetails;
  const { totalRewardNumber, setTotalRewardNumber } = rewardDetails;

  const totalAmount = getTotalCartAmount();
  const rewardPoints = calculateRewardPoints(totalAmount);
  const orderId = useMemo(orderIdGenerator, []);

  const navigate = useNavigate();

  const startCheckout = () => {
    // while checkout all order details get set and redirects user to checkout page with details
    setTotalOrders((prev) => [
      {
        orderId: orderId,
        orderTotal: totalAmount,
        productTotal: totalItemsInCart,
        rewardPoints: rewardPoints,
        date: Date.now(),
      },
      ...prev,
    ]);
    setTotalRewardNumber(Number(totalRewardNumber) + Number(rewardPoints));
    setOrderId(orderId);
    navigate("/checkout");
  };
  return (
    <div className="cart">
      {totalProducts?.length && totalAmount > 0 ? (
        <div>
          <h1>Your Cart Items</h1>
        </div>
      ) : null}

      <div className="cartDetails">
        <div className="cart">
          {totalProducts?.map((product) =>
              cartItems[product.id] !== 0 ? (
                <CartItem product={product} key={product.id} />
              ) : null
            )}
        </div>

        {totalAmount > 0 ? (
          <div className="cartTotal">
            <p>
              {" "}
              <b>Subtotal: ${totalAmount} </b>
            </p>
            <p>
              {" "}
              <b>
                Reward points you will get:
                <br /> {rewardPoints}
              </b>{" "}
            </p>
            <button onClick={startCheckout}> Checkout </button>

            <button onClick={() => navigate("/")}> Add More Products </button>
          </div>
        ) : (
          <div className="cartEmpty">
            <h1> Your cart is empty</h1>
            <button onClick={() => navigate("/")}> Add Products </button>
          </div>
        )}
      </div>
    </div>
  );
};
