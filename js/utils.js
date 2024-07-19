export const getProductsFromLS = () => {
  return JSON.parse(localStorage.getItem("products")) || [];
};

export const addToLS = (cards) => {
  localStorage.setItem("products", JSON.stringify(cards));
};

export const calculateProductCount = (cards) => {
  const menuBtn = document.querySelector(".menu-btn");
  const totalCount = cards.reduce((sum, card) => sum + Number(card.amount), 0);
  menuBtn.setAttribute("data-count", Number(totalCount));
};

export const calculateTotal = (cards) => {
  const total = document.querySelector(".total");
  const price = cards.reduce((sum, card) => sum + card.price * card.amount, 0);
  if (cards.length > 0) {
    total.innerHTML = `Total: $${price.toFixed(2)}`;
  }
};
