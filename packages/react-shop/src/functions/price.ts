export const getDiscountPercentage = (original: number, calculated: number) => {
  const diff = original - calculated;
  const decrease = (diff / original) * 100;
  return Number(Number(Math.round(+(decrease + 'e' + 2)) + 'e' + -2).toFixed(2));
};

export const getOriginalPrice = (calculatedPrice: number, discountPercentage = 0) => {
  const discountFraction = discountPercentage / 100;
  const originalPrice = calculatedPrice / (1 - discountFraction);
  return Number(Number(Math.round(+(originalPrice + 'e' + 2)) + 'e' + -2).toFixed(2));
};
