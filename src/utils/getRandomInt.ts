export const getRandomInt = (max: number, plus = 0) => {
  return Math.floor(Math.random() * max) + plus;
};