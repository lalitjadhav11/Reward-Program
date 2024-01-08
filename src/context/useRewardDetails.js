import { useContext } from "react";
import { ShopContext } from "./shop-context";

export const useRewardDetails = () => {
    
    const {
        rewardDetails
    } = useContext(ShopContext);
    
    return { rewardDetails };
    
};