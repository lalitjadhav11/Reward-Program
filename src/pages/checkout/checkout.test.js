import { render, fireEvent, screen } from "@testing-library/react";
import { Checkout } from "./checkout";
import { ShopContext } from "../../context/shop-context";
import TestCaseHelper from "../../helpers/test-case-helpers";
import "@testing-library/jest-dom";

const mockNavigateFn = jest.fn();

jest.mock("react-router-dom", () => {
  return { useNavigate: () => mockNavigateFn };
});

test("Checkout component rendering with no orders", () => {
  const { getByText } = render(
    <TestCaseHelper
      Component={Checkout}
      componentContext={ShopContext}
      contextValue={{
        cartActions: { getTotalCartAmount: jest.fn() },
        rewardDetails: { totalRewardNumber: 0 },
        orderDetails: { orderId: 0 },
        checkout: jest.fn(),
      }}
    >
      {" "}
    </TestCaseHelper>
  );

  expect(getByText("Order details not available")).toBeInTheDocument();
  const addProductsBtn = getByText("View Order History");
  fireEvent.click(addProductsBtn);
  expect(mockNavigateFn).toHaveBeenCalled();
});

test("Checkout component rendering with order details", () => {
  const { getByText } = render(
    <TestCaseHelper
      Component={Checkout}
      componentContext={ShopContext}
      contextValue={{
        cartActions: { getTotalCartAmount: jest.fn() },
        rewardDetails: { totalRewardNumber: 100 },
        orderDetails: { orderId: "123456789ABCDEFGHIJK" },
        checkout: jest.fn(),
      }}
    >
      {" "}
    </TestCaseHelper>
  );

  expect(getByText("Order placed successfully!")).toBeInTheDocument();
  const addProductsBtn = getByText("View Order History");
  fireEvent.click(addProductsBtn);
  expect(mockNavigateFn).toHaveBeenCalled();
});
