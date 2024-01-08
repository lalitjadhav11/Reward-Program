import { render, screen } from "@testing-library/react";
import { OrderItem } from "./order-item";
import { ShopContext } from "../../context/shop-context";
import TestCaseHelper from "../../helpers/test-case-helpers";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => {
  return { useNavigate: jest.fn() };
});

const orderData = {
  id: 1,
  orderId: "1db606de-1028-4d5d-9724-5f391d54b5c2",
  orderTotal: 100.0,
  productTotal: 1,
  rewardPoints: 50,
  date: 1699699021067,
};

const TableMockComponent = () => {
  return (
    <table>
      <tbody>
        <OrderItem order={orderData} />
      </tbody>
    </table>
  );
};

test("OrderItem component rendering", () => {
  render(
    <TestCaseHelper
      Component={TableMockComponent}
      componentContext={ShopContext}
    >
      {" "}
    </TestCaseHelper>
  );

  const linkElement1 = screen.getByText("1db606de-1028-4d5d-9724-5f391d54b5c2");
  expect(linkElement1).toBeInTheDocument;

  const linkElement2 = screen.getByText("$100");
  expect(linkElement2).toBeInTheDocument;

  const linkElement3 = screen.getByText("50");
  expect(linkElement3).toBeInTheDocument;

  const linkElement4 = screen.getByText("Sat Nov 11 2023");
  expect(linkElement4).toBeInTheDocument;
});
