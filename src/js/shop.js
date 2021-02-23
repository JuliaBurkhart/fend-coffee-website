import products from "./products.json";
import productImages from "../images/products/*.png";
import productSvgs from "../images/*.svg";



//Das Div im Shop wo die Produkte rein sollen!


// const productCardTemplate = `${products.map(function (product) {
//     `<include src="product-card.html" locals='{"productName": ${product.productName}, "productPrice": ${product.price}, iconColour": " types__icon--black"}'></include>`
// })}`;




const productContainer = document.querySelector(".types__flex-container");
const productCardTemplate = `
${products.map(function (product) {
    let cardHTML = `
    <div class="product-card">
  <div class="types__img-box u-margin-bottom-small">
    <img
      class="types__img"
      src="${productImages[product.image]}"
      alt="Verpackung der Kaffeesorte Costa Rica"
    />
  </div>

  <h4 class="h4">${product.productName}</h4>
  <p class="paragraph price">${product.price}</p>
  <div class="types__icons">
    <img
      class="types__icon types__icon--black"
      src="${productSvgs[product.svg1]}"
    />
    <img
      class="types__icon types__icon--black"
      src="${productSvgs[product.svg2]}"
    />
    <img
      class="types__icon types__icon--black"
      src="${productSvgs[product.svg3]}"
    />
  </div>
</div>

    `;
    return cardHTML;
})
.join("")}`;

console.log(productCardTemplate);
productContainer.innerHTML = productCardTemplate;



