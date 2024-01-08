import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import calculateRewardPoints from "../../helpers/calculateRewardPoints";
import { useRewardDetails, useCartActions, useCheckout, useOrderActions } from "../../context/";
import "./checkout.css";

export const Checkout = () => {
  const { cartActions } = useCartActions();
  const { rewardDetails } = useRewardDetails();
  const { orderDetails } = useOrderActions();
  const { checkout } = useCheckout();
  const { getTotalCartAmount } = cartActions;
  const { totalRewardNumber } = rewardDetails;
  const { orderId } = orderDetails;

  const [totalAmount, setTotalAmount] = useState(0);
  const rewardPoints = calculateRewardPoints(totalAmount);
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      // added `return` for clean-up of cart in checkout() method which is necessary to set the cart model empty after placing an order successfully.
      if (!mounted) {
        // preventing it from rendering multiple times
        setMounted(true);
        const totalCartAmount = getTotalCartAmount();
        setTotalAmount(totalCartAmount);
        checkout();
      }
    };
  }, [mounted, getTotalCartAmount, checkout]);
  return (
    <div className="checkout">
      {orderId ? (
        <>
          <div>
            <h1>Order placed successfully!</h1>
          </div>
          <div>
            <p>
              Order Id: <b>{orderId}</b>
            </p>
            <p>
              {" "}
              Total amount: <b>${totalAmount} </b>
            </p>
            <p>
              {" "}
              Reward points earned for this order: <b>{rewardPoints}</b>{" "}
            </p>
            <p>
              {" "}
              Your total reward points: <b>{totalRewardNumber}</b>
            </p>
          </div>
        </>
      ) : (
        <>
          <div>
            <h1>Order details not available </h1>
          </div>
        </>
      )}

      <div>
        <button
          onClick={() => {
            checkout();
            navigate("/orders");
          }}
        >
          {" "}
          View Order History{" "}
        </button>
      </div>
    </div>
  );
};
