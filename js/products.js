const productList = document.querySelector(".product-list");

//! Get Data
export const getData = async () => {
  const url = "../db.json";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Üzgünüz bir hata oluştu");
    }

    return data;
  } catch (error) {
    console.log("ERROR : ", error);
  }
};

//! Render Products
export const renderProducts = (data, addProductsCallBack) => {
  let products = "";

  data.map((product) => {
    const { id, image, title, price } = product;

    products += `
        <li class="product-list-item">
            <div class="product-img">
              <img
                src="${image}"
              />
            </div>
            <h2 class="product-title">${title}</h2>
            <p class="product-price">$${price}</p>
            <button class="product-add-btn" data-id="${id}">Add to card</button>
        </li>
    `;
  });

  productList.innerHTML = products;

  const addProductBtns = [
    ...document.getElementsByClassName("product-add-btn"),
  ];

  addProductBtns.forEach((addProductBtn) => {
    addProductBtn.addEventListener("click", addProductsCallBack);
    const cards = JSON.parse(localStorage.getItem("products")) || [];
    const id = addProductBtn.dataset.id;
    cards.forEach((card) => {
      if (card.id === Number(id)) {
        addProductBtn.innerHTML = "Added";
        addProductBtn.disabled = true;
        addProductBtn.style.pointerEvents = "none";
      }
    });
  });
};
