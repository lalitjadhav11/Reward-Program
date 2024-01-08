import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { useCartActions, useRewardDetails } from "../../context/";
import "./navbar.css";

export const Navbar = () => {
  const { cartDetails } = useCartActions();
  const { rewardDetails } = useRewardDetails();
  const { totalItemsInCart } = cartDetails;
  const { totalRewardNumber } = rewardDetails;

  return (
    <div className="navbar">
      <div className="links">
        <div className="reward-badge">
          Total Reward Points :<b>{totalRewardNumber}</b>
        </div>
        <Link to="/"> Shop </Link>
        <Link to="/cart">
          {totalItemsInCart > 0 ? (
            <span className="badge">{totalItemsInCart}</span>
          ) : (
            ""
          )}
          <ShoppingCart size={28} />
        </Link>
        <Link to="/orders"> Orders </Link>
      </div>
    </div>
  );
};
