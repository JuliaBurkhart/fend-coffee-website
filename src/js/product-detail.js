import products from "./products.json";
import productImages from "../images/products/*.png";
import productSvgs from "../images/*.svg";
import createShoppingCard from "./cart";

const cartCounterSpan = document.querySelector(".cart__button__counter");

// Die URL auslesen
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Daraus die ID suchen
const currentId = parseInt(urlParams.get("id"), 10);

// Das entsprechende Object aus dem Array suchen
const currentProduct = products.find((product) => product.id === currentId);

// Die Varianten des einzelnen Produktes nach Preis sortieren
const sortedVariants = currentProduct.variants.sort((variant1, variant2) => {
  if (variant1.price > variant2.price) {
    return 1;
  }
  return -1;
});

// Das ganze HTML für die Detail-Ansicht
const productDetailView = `
<div class="detail-page__flex-container">
<div class="detail-page__flex-item">
   <div class="detail-page__img-box u-margin-bottom-small">
   <img
     class="detail-page__img"
     src="${productImages[currentProduct.image]}"
     alt="Verpackung der Kaffeesorte Costa Rica"
   />
 </div>
</div>
 <div class="detail-page__flex-item">
   <h2 class="h2">${currentProduct.productName}</h2>
   <p class="paragraph price u-margin-bottom-small u-margin-top-small">${(
     sortedVariants[0].price / 100
   ).toFixed(2)}€ - ${(
  sortedVariants[sortedVariants.length - 1].price / 100
).toFixed(2)}€</p>
  
  <p class="paragraph">${currentProduct.teaser}</p>

  <div class="dropdown  u-margin-bottom-small">
                <ul class="dropdown-bar">
                  <li class="dropdown-bar__text" id="dropdown-label" tabindex="0">
                  Wie viel Kaffee brauchst du?
                  </li>
                  <li
                    class="dropdown-bar__button"
                    id="dropdown__button"
                    role="button"
                    tabindex="0"
                    aria-labelledby="dropdown-label"
                  >
                  &nbsp;
                  </li>
                </ul>
          
                <div class="dropdown-content" aria-expanded="false">
                  <ul>
                    <li class="dropdown-content__li" id="dropdown__li--1" tabindex="0">
                    250g gemahlen
                    </li>
                    <li class="dropdown-content__li" id="dropdown__li--2" tabindex="0">
                    500g gemahlen
                    </li>
          
                    <li class="dropdown-content__li" id="dropdown__li--3" tabindex="0">
                    250g Bohnen
                    </li>
          
                    <li class="dropdown-content__li" id="dropdown__li--4" tabindex="0">
                    500g Bohnen                    </li>
                  </ul>
                </div>
    </div>

<div class="u-align-center">
<button class="true-button" data-product-id="${
  currentProduct.id
}">In den Warenkorb</button>
  </div>
  <div class="detail-page__icon-container u-margin-top-medium">
<div class="detail-page__icon-box">
    <img
      class="detail-page__icon"
      src="${productSvgs[currentProduct.svg1]}"
    />
    <p class="paragraph">Mild geröstet</p>
</div>
    <div class="detail-page__icon-box">
    <img
      class="detail-page__icon"
      src="${productSvgs[currentProduct.svg2]}"
    />
    <p class="paragraph">Mild geröstet</p>
    </div>
    <div class="detail-page__icon-box">
    <img
      class="detail-page__icon"
      src="${productSvgs[currentProduct.svg3]}"
    />
    <p class="paragraph">Mild geröstet</p>
    </div>
  </div>
  </div>
  </div>
  <div class="detail-page__description">
  <h3 class="h3 u-margin-top-medium u-margin-bottom-small">Beschreibung</h3>
  <p class="paragraph">${currentProduct.description}</p>
</div>
    `;

// HTML auf die Seite packen

function createDetailPage() {
  const productDetailSection = document.getElementById("product-detail");
  productDetailSection.innerHTML = productDetailView;
}

createDetailPage();

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
    cartCounterSpan.style.display = "block";
    cartCounterSpan.innerHTML = `${updatedCart.length}`;
    createShoppingCard();
  }
}

// EventListener für die add-to-cart Buttons
const cartButtons = document.querySelectorAll(".true-button");
cartButtons.forEach((cartButton) => {
  cartButton.addEventListener("click", handleCartButtonClick);
});
