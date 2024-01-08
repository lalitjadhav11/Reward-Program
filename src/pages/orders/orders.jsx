import { OrderItem } from "./order-item";
import { useRewardDetails, useOrderActions } from "../../context/";

import "./orders.css";

export const Orders = () => {
  const { rewardDetails } = useRewardDetails();
  const { orderDetails } = useOrderActions();
  const { totalRewardNumber } = rewardDetails;
  const { totalOrders } = orderDetails;

  return (
    <div className="orders">
      <div>
        <h2>Your order history</h2>
      </div>
      <p>
        <b>Total reward points: {totalRewardNumber} </b>
      </p>
      <table className="order-list">
        <tbody>
          <tr>
            <th>Order Id</th>
            <th>Order Total</th>
            <th>Reward Points</th>
            <th>Date</th>
          </tr>
          {totalOrders?.map((eachOrder) => {
            return (
              <OrderItem
                order={eachOrder}
                key={eachOrder.orderId}
              />
            );
          })}
        </tbody>
      </table>

      <p className="rewardInfoText">
        * Reward points listed in <span className="expired"> gray </span>color
        are expired as older than 3 months.
      </p>
    </div>
  );
};
