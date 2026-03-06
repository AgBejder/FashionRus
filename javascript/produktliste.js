"use strict";
const params = new URLSearchParams(window.location.search);

const category = params.get("category") ?? "Apparel";

let allProducts = [];

document.querySelector(".asc").addEventListener("click", kliksorter);
document.querySelector(".desc").addEventListener("click", kliksorter);
function kliksorter(evt) {
  const direction = evt.target.dataset.direction;
  const sorted = [...allProducts].sort((a, b) =>
    direction === "asc" ? b.price - a.price : a.price - b.price,
  );
  showProducts(sorted);
}

const productListContainer = document.querySelector("main");
fetch(`https://kea-alt-del.dk/t7/api/products?limit=56&category=${category}`)
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    showProducts(allProducts);
  });

function showProducts(productsArr) {
  productListContainer.innerHTML = "";

  productsArr.forEach((product) => {
    // Regel: Kun vis SOLD OUT hvis produktet er udsolgt
    const soldOutText =
      product.soldout == 1
        ? `<p class="soldOuttext color-me-white">SOLD OUT</p>`
        : "";

    // Regel: Kun vis rabat hvis discount > 0
    const discountText =
      product.discount > 0
        ? `<p class="color-me-red">${product.discount}%</p>`
        : "";

    // Regel: Kun vis "NOW price" hvis der er rabat
    const discountedPrice =
      product.discount > 0
        ? `<div class="discounted">
            <p>NOW DKK ${Math.round(
              product.price * (1 - product.discount / 100),
            )},-</p>
          </div>`
        : "";

    productListContainer.innerHTML += `
      <article class="small_product ${product.soldout == 1 ? "sold-out" : ""}">
        <div class="sold-out-and-img-container">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
            alt="${product.productdisplayname}"
          />
          ${soldOutText}
          ${discountText}
        </div>
        <div>
          <h3>${product.productdisplayname}</h3>
          <p>${product.articletype} | ${product.brandname}</p>
          <p>DKK ${product.price},-</p>
          ${discountedPrice}
        </div>
        <a href="produkt.html?id=${product.id}">Read more</a>
      </article>
    `;
  });
}
