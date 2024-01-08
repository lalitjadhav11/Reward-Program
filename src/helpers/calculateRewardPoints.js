const calculateRewardPoints = (totalAmount) => {
  const amount2x = totalAmount > 100 ? totalAmount - 100 : 0;
  const amount1x = totalAmount > 50 ? totalAmount - amount2x - 50 : 0;
  return Number((amount2x * 2 + amount1x).toFixed(0));
};

export default calculateRewardPoints;
