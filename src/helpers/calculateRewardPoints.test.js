import calculateRewardPoints from "./calculateRewardPoints";

test("Calculate Reward Points", () => {
  expect(calculateRewardPoints(50)).toEqual(0);
  expect(calculateRewardPoints(100)).toEqual(50);
  expect(calculateRewardPoints(200)).toEqual(250);
});
