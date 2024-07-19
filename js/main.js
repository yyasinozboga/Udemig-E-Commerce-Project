import { addProduct, renderProductsFromLS, cards } from "./card.js";
import { calculateProductCount, calculateTotal } from "./utils.js";
import { getData, renderProducts } from "./products.js";
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const resMenuBtn = document.querySelector(".res-menu-btn");

window.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname.includes("card.html")) {
    renderProductsFromLS();
    calculateProductCount(cards);
    calculateTotal(cards);

    backBtn.addEventListener("click", () => {
      window.location.pathname = "/html/index.html";
    });
  } else {
    const data = await getData();
    renderProducts(data, (e) => addProduct(e, data));
    calculateProductCount(cards);
  }
});

menuBtn.addEventListener("click", () => {
  window.location.pathname = "/html/card.html";
});

resMenuBtn.addEventListener("click", () => {
  const navList = document.querySelector(".nav-list");
  navList.classList.toggle("open-menu");
});
