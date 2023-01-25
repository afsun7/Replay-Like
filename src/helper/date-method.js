export const DateCalculator = (currentDate, commentDate) => {
  const diffTime = Math.abs(currentDate - commentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const DaysAgo = diffDays + " Days ago";
  return DaysAgo;
};
