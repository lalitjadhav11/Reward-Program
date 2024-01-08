import { render, screen } from "@testing-library/react";
import { Orders } from "./orders";
import { ShopContext } from "../../context/shop-context";
import TestCaseHelper from "../../helpers/test-case-helpers";

jest.mock("react-router-dom", () => {
  return { useNavigate: jest.fn() };
});

test("Order component rendering", () => {
  render(
    <TestCaseHelper
      Component={Orders}
      componentContext={ShopContext}
      contextValue={{
        rewardDetails: { totalRewardNumber: 100 },
        orderDetails: {
          totalOrders: [
            {
              id: 1,
              orderId: "1db606de-1028-4d5d-9724-5f391d54b5c2",
              orderTotal: 100.0,
              productTotal: 1,
              rewardPoints: 50,
              date: 1699699021067,
            },
          ],
        },
      }}
    >
      {" "}
    </TestCaseHelper>
  );

  const linkElement = screen.getByText("Total reward points: 100");
  expect(linkElement).toBeInTheDocument;
});
