import products from "./products.json";
import productImages from "../images/products/*.png";
import productSvgs from "../images/*.svg";

// Produkte aus der JSON in die Types-Section packen

function createTypesCard(product) {
  const cardHTML = `
    <div class="product-card">
        <div class="types__img-box u-margin-bottom-small">
        <img
      class="types__img"
      src="${productImages[product.image]}"
      alt="Verpackung der Kaffeesorte Costa Rica"
    />
        </div>
  
  <h4 class="h4" id="product-title"  data-product-id="${product.id}">${
    product.productName
  }</h4>
  <p class="paragraph price">${product.price}</p>
  <div class="types__icons">
    <img
      class="types__icon types__icon--white"
      src="${productSvgs[product.svg1]}"
    />
    <img
      class="types__icon types__icon--white"
      src="${productSvgs[product.svg2]}"
    />
    <img
      class="types__icon types__icon--white"
      src="${productSvgs[product.svg3]}"
    />
  </div>
  
    </div>
  </div>
    `;
  return cardHTML;
}

function createTypesSection() {
  const typesCardTemplate = products.map(createTypesCard).join("");
  const typesContainer = document.querySelector(".types__flex-container");
  typesContainer.innerHTML = typesCardTemplate;
}

createTypesSection();
