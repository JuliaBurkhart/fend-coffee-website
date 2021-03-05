import products from "./products.json";
import productImages from "../images/products/*.png";
import productSvgs from "../images/*.svg";
import createShoppingCard from "./cart";

const cartCounterSpan = document.querySelector(".cart__button__counter");

// Produkte aus der JSON auf die Shop-Seite packen

function createProductCard(product) {
  // Die Varianten des einzelnen Produktes nach Preis sortieren
  const sortedVariants = product.variants.sort((variant1, variant2) => {
    if (variant1.price > variant2.price) {
      return 1;
    }
    return -1;
  });

  const url = `product-detail.html?id=${product.id}`;

  const cardHTML = `
  <div class="product-card">
<div class="types__img-box u-margin-bottom-small">
  <img
    class="types__img"
    src="${productImages[product.image]}"
    alt="Verpackung der Kaffeesorte Costa Rica"
  />
  <button class="add-to-cart__button" data-product-id="${
    product.id
  }">quick add +</button>
</div>

<h4 class="h4" id="product-title"  data-product-id="${
    product.id
  }"><a href=${url}>${product.productName}</a></h4>
<p class="paragraph price">${(sortedVariants[0].price / 100).toFixed(2)}€ - ${(
    sortedVariants[sortedVariants.length - 1].price / 100
  ).toFixed(2)}€</p>
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
  if (currentCart === null) {
    localStorage.setItem("cart", JSON.stringify([chosenProduct]));
    cartCounterSpan.style.display = "block";
    createShoppingCard();
  } else {
    const updatedCart = [...currentCart, chosenProduct];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log(updatedCart.length);

    cartCounterSpan.style.display = "block";
    cartCounterSpan.innerHTML = `${updatedCart.length}`;
    createShoppingCard();

    // currentCart.forEach((item) => {
    //   if (item.id === chosenProductId) {
    //     item.quantity += 1;
    //     return item.quantity;
    //   }
    //   const updatedCart = [...currentCart, chosenProduct];
    //   localStorage.setItem("cart", JSON.stringify(updatedCart));
    //   location.reload();
    // });
  }
}
// EventListener für die add-to-cart Buttons
const cartButtons = document.querySelectorAll(".add-to-cart__button");
cartButtons.forEach((cartButton) => {
  cartButton.addEventListener("click", handleCartButtonClick);
});
