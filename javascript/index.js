const categoryListContainer = document.querySelector(
  ".category_list_container",
);
// const categories = [
//   "Accessories",
//   "Apparel",
//   "Footwear",
//   "Free Items",
//   "Personal Care",
//   "Sporting Goods",
// ];

// categories.forEach((category) => {
//   categoryListContainer.innerHTML += `<a href="produktliste.html">${category}</a>`;
// });
// console.log(category);

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((category) => {
      categoryListContainer.innerHTML += `<li><a href="produktliste.html">${category.category}</a></li>`;
    });
  });
