import propTypes from "prop-types";
import { useMemo } from "react";
import { isPost3Months } from "../../helpers/isPost3Months";
import "./order-item.css";
export const OrderItem = ({ order = null }) => {
  const isRewardPointNotEligible = useMemo(
    () => isPost3Months(order.date, new Date().getTime()),
    [order]
  );
  const displayDate = new Date(Number(order.date));

  return (
    <tr key={order.orderId + "order-item"}>
      <td>{order.orderId}</td>
      <td>${order.orderTotal}</td>
      <td className={isRewardPointNotEligible ? "expired" : ""}>
        {order.rewardPoints}
      </td>
      <td>{displayDate.toDateString()}</td>
    </tr>
  );
};
OrderItem.propTypes = {
  order:  propTypes.shape({
    id: propTypes.number,
    orderId: propTypes.string,
    orderTotal: propTypes.number,
    productTotal: propTypes.number,
    rewardPoints: propTypes.number,
    date: propTypes.number
  }).isRequired
};