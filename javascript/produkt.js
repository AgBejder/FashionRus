const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const produktImage = document.querySelector(".product-page");

console.log("ID fra URL:", id);
fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    const soldOut = data.soldout == 1;
    const soldOutText = soldOut
      ? `<p class="soldOuttext color-me-white">SOLD OUT</p>`
      : "";
    const discountText =
      data.discount > 0 ? `<p class="color-me-red">${data.discount}%</p>` : "";
    const discountedPrice =
      data.discount > 0
        ? `<div class="discounted"><p>NOW DKK ${Math.round(data.price * (1 - data.discount / 100))},-</p></div>`
        : "";

    produktImage.innerHTML = `
      <section class="product-image ${soldOut ? "sold-out" : ""}">
        <div class="sold-out-and-img-container">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp"
            alt="${data.productdisplayname}"
          />
          ${soldOutText}
          ${discountText}
        </div>
      </section>

      <section class="product-info">
        <h1>${data.productdisplayname}</h1>

        <p><strong>Color</strong><br />${data.basecolour}</p>
        <p><strong>Inventory number</strong><br />${data.id}</p>

        <h2>${data.brandname}</h2>
        <p>${data.brandbio}</p>
      </section>

      <section class="product-buy">
        <p>${data.brandname} | ${data.articletype}</p>
        <p><strong>Price</strong><br />DKK ${data.price},-</p>
        ${discountedPrice}
        <label for="size">Choose a size</label>
        <select id="size" ${soldOut ? "disabled" : ""}>
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>
        <button ${soldOut ? "disabled" : ""}>${soldOut ? "Sold out" : "Add to basket"}</button>
      </section>
    `;
  });
