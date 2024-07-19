import {
  addToLS,
  calculateProductCount,
  calculateTotal,
  getProductsFromLS,
} from "./utils.js";

export const cards = JSON.parse(localStorage.getItem("products")) || [];

export const addProduct = (e, products) => {
  const ele = e.target;

  const product = products.find(
    (product) => product.id === Number(ele.dataset.id),
  );

  const { id, image, title, price } = product;

  const productItem = {
    id,
    image,
    title,
    price,
    amount: 1,
  };

  cards.push(productItem);
  addToLS(cards);
  ele.innerHTML = "Added";
  ele.disabled = true;
  ele.style.pointerEvents = "none";
  calculateProductCount(cards);
};

const productList = document.querySelector(".product-list");
const container = document.querySelector(".product-list-container");
const productTitle = document.querySelector(".product-title");

export const renderProductsFromLS = () => {
  let products = "";

  const cards = getProductsFromLS();

  if (cards.length > 0) {
    cards.map((card) => {
      const { id, image, title, price, amount } = card;

      products += `
          <li class="product-list-item">
            <div class="product-img">
              <img
                src="${image}"
              />
            </div>

            <div>
              <h3 class="product-title">${title}</h3>
              <input type="number" class="product-amount" min="1" value="${amount}" 
              data-id="${id}" />
            </div>

            <p class="product-price">$${price}</p>

            <button class="product-delete-btn" data-id="${id}">Remove</button>
        </li>
      `;
    });

    productList.innerHTML = products;
  } else {
    products = "<h1 class='error-title'>Sepette hiç ürün yok</h1>";
    productTitle.classList.add("disabled");
    container.innerHTML = products;
  }

  productList.addEventListener("click", (e) => {
    const ele = e.target;
    console.log(ele);

    if (ele.className === "product-delete-btn") {
      deleteProduct(ele, cards);
    }
  });

  productList.addEventListener("change", (e) => {
    const ele = e.target;

    if (ele.className === "product-amount") {
      changeAmount(ele, cards);
    }
  });
};

const deleteProduct = (element, cards) => {
  const id = element.dataset.id;
  const filtered = cards.filter((card) => card.id !== Number(id));
  addToLS(filtered);
  renderProductsFromLS();
  calculateProductCount(filtered);
  calculateTotal(filtered);
};

const changeAmount = (element, cards) => {
  const id = element.dataset.id;
  const edited = cards.find((card) => card.id === Number(id));
  edited.amount = element.value;
  addToLS(cards);
  calculateProductCount(cards);
  calculateTotal(cards);
};
