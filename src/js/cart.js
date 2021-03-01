import productImages from "../images/products/*.png";
import productSvgs from "../images/*.svg";

// Button und Link zum Warenkorb
const cartContainer = document.getElementById("cart");
const cartButton = document.querySelector(".cart__button");
const cartLink = document.querySelector(".cart__link");

// Warenkorb öffnen und schließen
function toggleShoppingCart() {
  if (cartContainer.style.display === "none") {
    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }
}

cartButton.addEventListener("click", toggleShoppingCart);
cartLink.addEventListener("click", toggleShoppingCart);

// Grundgerüst für den Warenkorb
const cartPageHtml = `
<div class="cart__close__div">
<button class="cart__close">
    <img class="cart__close__svg" src="${productSvgs["burger-close-white"]}" alt="Warenkorb schließen" />
  </button>
  </div>
  <div class="cart__head">
<h3 class="h3">Warenkorb</h3><span class="paragraph">3 Produkte</span>
</div>
<div class="cart__added-successfully paragraph">1 Produkt wurde erfolgreich zum Warenkorb hinzugefügt</div>
<div class="cart__flex-container">


</div>
`;
cartContainer.innerHTML = cartPageHtml;

// den aktuellen Warenkorb-Inhalt aus dem local storage suchen
const currentCartItems = JSON.parse(localStorage.getItem("cart"));

// Function erstellt Item-Einträge im Warenkorb
function createItemEntry(item) {
  const itemInCart = `<div class="cart__item">

  <img
       class="cart__img"
       src="${productImages[item.image]}"
       alt="Verpackung der Kaffeesorte Costa Rica"
     />

     <div class="cart__item-title h3">${item.productName}</div>
     <div class="cart__quantity paragraph">Variante hier anzeigen</div>
     <div class="cart__status paragraph">Versandstatus</div>
     <div class="cart__price h1-sub">${item.price}</div>
     
     
     <div class="cart__item-close"><img class="cart__close__svg" src="${
       productSvgs["burger-close-white"]
     }"></div>
  <hr class="cart__hr">
  </div>`;
  return itemInCart;
}

// Für jedes Item im Warenkorb (currentCartItems-Array) wird die
// function createItemEntry ausgeführt und dann alle Einträge in den Container gepackt

const allItemsInCart = currentCartItems.map(createItemEntry).join("");
const cartFlexContainer = document.querySelector(".cart__flex-container");
cartFlexContainer.innerHTML = allItemsInCart;
