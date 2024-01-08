import { render, fireEvent, screen } from "@testing-library/react";
import { Cart } from "./cart";
import { ShopContext } from "../../context/shop-context";
import TestCaseHelper from "../../helpers/test-case-helpers";

import "@testing-library/jest-dom";

const mockNavigateFn = jest.fn();

jest.mock("react-router-dom", () => {
  return { useNavigate: () => mockNavigateFn };
});

const mockContextValue = {
  cartDetails: {
    cartItems: { 1: 2, 2: 1 },
    totalItemsInCart: 3,
  },
  cartActions: {
    getTotalCartAmount: jest.fn(() => 50),
  },
  orderActions: {
    setTotalOrders: jest.fn(),
    setOrderId: jest.fn(),
  },
  productDetails: {
    totalProducts: [
      {
        id: 1,
        productName: "test product",
        price: 25.0,
        productImage: "1.png",
      },
    ],
  },
  rewardDetails: {
    totalRewardNumber: 100,
    setTotalRewardNumber: jest.fn(),
  },
};

test("Cart component rendering", () => {
  const { getByText } = render(
    <TestCaseHelper
      Component={Cart}
      componentContext={ShopContext}
      contextValue={mockContextValue}
    >
      {" "}
    </TestCaseHelper>
  );
});

const mockEmptyCartContext = {
  cartDetails: {
    cartItems: {},
    totalItemsInCart: 0,
  },
  cartActions: {
    getTotalCartAmount: jest.fn(() => 0),
  },
  orderActions: {
    setTotalOrders: jest.fn(),
    setOrderId: jest.fn(),
  },
  productDetails: {
    totalProducts: [],
  },
  rewardDetails: {
    totalRewardNumber: 0,
    setTotalRewardNumber: jest.fn(),
  },
};

test("Empty Cart component rendering", () => {
  const { getByText } = render(
    <TestCaseHelper
      Component={Cart}
      componentContext={ShopContext}
      contextValue={mockEmptyCartContext}
    >
      {" "}
    </TestCaseHelper>
  );

  expect(getByText("Your cart is empty")).toBeInTheDocument();
  const addProductsBtn = getByText("Add Products");
  fireEvent.click(addProductsBtn);
  expect(mockNavigateFn).toHaveBeenCalled();
});
