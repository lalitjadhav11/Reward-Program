import { render, fireEvent } from "@testing-library/react";
import { CartItem } from "./cart-item";
import { ShopContext } from "../../context/shop-context";
import TestCaseHelper from "../../helpers/test-case-helpers";

import "@testing-library/jest-dom";

const contextValue = {
  cartActions: {
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateCartItemCount: jest.fn(),
  },
  cartDetails: { cartItems: [], totalItemsInCart: [] },
};

test("CartItem component rendering", () => {
  const productData = {
    id: 1,
    productName: "test product",
    price: 35.0,
    productImage: "1.png",
  };

  const { getByText, getByAltText } = render(
    <TestCaseHelper
      Component={CartItem}
      componentContext={ShopContext}
      product={productData}
      contextValue={contextValue}
      require={jest.fn()}
    >
      {" "}
    </TestCaseHelper>
  );

  expect(getByText("test product")).toBeInTheDocument();
  expect(getByText("Price: $35")).toBeInTheDocument();
  expect(getByAltText("test product")).toBeInTheDocument();

  const addBtn = getByText("+");
  fireEvent.click(addBtn);
  expect(contextValue.cartActions.addToCart).toHaveBeenCalled();

  const removeBtn = getByText("-");
  fireEvent.click(removeBtn);
  expect(contextValue.cartActions.removeFromCart).toHaveBeenCalled();
});
