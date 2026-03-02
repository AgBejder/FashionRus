"use strict";
const productListContainer = document.querySelector("main");
fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then((data) => {
    showProducts(data);
  });

function showProducts(productsArr) {
  //   console.log("productsArr", productsArr);
  productListContainer.innerHTML = "";
  productsArr.forEach((product) => {
    console.log(product);
    productListContainer.innerHTML += `<article class="small_product">
        <div class="sold-out-and-img-container">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
            alt="product image"
          />

          <p class="soldOuttext color-me-white">SOLD OUT</p>
          <p class="color-me-red">10%</p>
        </div>
        <div>
          <h3>${product.productdisplayname}</h3>
          <p>${product.articletype}|${product.brandname}</p>
          <p>DKK ${product.price},-</p>
          <div class="discounted">
            <p>NOW DKK 399,-</p>
          </div>
        </div>
        <a href="produkt.html">Read more</a>
      </article>`;
  });
}
