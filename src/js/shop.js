import products from "./products.json";
import productImages from "../images/products/*.png";
import productSvgs from "../images/*.svg";

// Produkte aus der JSON auf die Shop-Seite packen

function createProductCard(product) {
  const url = `product-detail.html?id=${product.id}`;
  const cardHTML = `
  <div class="product-card">
<div class="types__img-box u-margin-bottom-small">
  <img
    class="types__img"
    src="${productImages[product.image]}"
    alt="Verpackung der Kaffeesorte Costa Rica"
  />
</div>

<h4 class="h4" id="product-title"  data-product-id="${
    product.id
  }"><a href=${url}>${product.productName}</a></h4>
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
<button class="add-to-cart__button" data-product-id="${
    product.id
  }">In den Warenkorb</button></div>
</div>
  `;
  return cardHTML;
}

function createShop() {
  const productCardTemplate = products.map(createProductCard).join("");
  const productContainer = document.querySelector(".types__flex-container");
  productContainer.innerHTML = productCardTemplate;
}

createShop();

// Was passiert bei klick auf den add-to-cart Button?

function handleCartButtonClick() {
  // rausfinden welches Produkt geklickt wurde und aus dem Array raussuchen
  const chosenProductId = parseInt(this.dataset.productId, 10);
  const chosenProduct = products.find(
    (product) => product.id === chosenProductId
  );

  // den aktuellen Warenkorb-Inhalt aus dem local storage suchen
  const currentCart = JSON.parse(localStorage.getItem("cart"));

  // Produkt im Warenkorb im local storage speichern, wenn schon was im Warenkorb drin war,
  // wird das neue Produkt ergänzt, ansonsten als erstes in den Warenkorb gepackt
  if (currentCart !== null) {
    const updatedCart = [...currentCart, chosenProduct];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  } else {
    localStorage.setItem("cart", JSON.stringify([chosenProduct]));
  }
}

// EventListener für die add-to-cart Buttons
const cartButtons = document.querySelectorAll(".add-to-cart__button");
cartButtons.forEach((cartButton) => {
  cartButton.addEventListener("click", handleCartButtonClick);
});

// // Was passiert bei Klick auf den Titel?

// function handleTitleClick() {
//   const currentProductId = parseInt(this.dataset.productId, 10);
//   const currentProduct = products.find(
//     (product) => product.id === currentProductId
//   );
//   console.log(currentProduct);
//   console.log(this);
// }

// // EventListener für die Produkttitel, soll später die Detailseite öffnen
// const productTitles = document.querySelectorAll("#product-title");
// productTitles.forEach((productTitle) => {
//   productTitle.addEventListener("click", handleTitleClick);
// });
