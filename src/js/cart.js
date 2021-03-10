// import productImages from "../images/products/*.png";
// import productSvgs from "../images/*.svg";

// // Button und Link zum Warenkorb
// const cartContainer = document.getElementById("cart");
// const cartButton = document.querySelector(".cart__button");
// const cartLink = document.querySelector(".cart__link");
// const cartCounterSpan = document.querySelector(".cart__button__counter");

// // Warenkorb öffnen und schließen
// function toggleShoppingCart() {
//   if (cartContainer.style.display === "block") {
//     cartContainer.style.display = "none";
//   } else {
//     cartContainer.style.display = "block";
//   }
// }

// cartButton.addEventListener("click", toggleShoppingCart);
// cartLink.addEventListener("click", toggleShoppingCart);

// /// ///////////////////////////////////////////////////////////////////////////////////////////////////
// /// // WARENKORB ERSTELLEN
// /// ///////////////////////////////////////////////////////////////////////////////////////////////////

// function createShoppingCard() {
//   // den aktuellen Warenkorb-Inhalt aus dem local storage suchen
//   const currentCartItems = JSON.parse(localStorage.getItem("cart"));

//   // Grundgerüst für den Warenkorb
//   const cartPageHtml = `
// <div class="cart__close__div">
// <button class="cart__close">
//     <img class="cart__close__svg" src="${productSvgs["burger-close-white"]}" alt="Warenkorb schließen" />
//   </button>
//   </div>
//   <div class="cart__head">
// <h3 class="h3">Warenkorb</h3><span class="paragraph">${currentCartItems.length} Produkte</span>
// </div>
// <div class="cart__added-successfully paragraph">1 Produkt wurde erfolgreich zum Warenkorb hinzugefügt</div>
// <div class="cart__flex-container">
// </div>

// <div class="cart__order-overview__container">
// <h2 class="h2 u-margin-bottom-small">Bestellübersicht</h2>
// <div class="cart__order-overview__table-row">
// <span class="paragraph">Zwischensumme</span>
// <span class="paragraph" id="sub-total"></span>
// </div>
// <div class="cart__order-overview__table-row">
// <span class="paragraph">Versandkosten</span>
// <span class="paragraph" id="shipping"></span>
// </div>
// <hr class="cart__order-overview__hr">
// <div class="cart__order-overview__table-row">
// <span class="paragraph">Gesamtbetrag</span>
// <span class="paragraph" id="total-amount"></span>
// </div>
// <div class="u-align-center">
// <button class="true-button--light">bezahlen</button>
//   </div>
// </div>
// `;
//   cartContainer.innerHTML = cartPageHtml;

//   // Button zum Schließen des Warenkorbs
//   const cartCloseButton = document.querySelector(".cart__close");
//   cartCloseButton.addEventListener("click", toggleShoppingCart);

//   // Function erstellt Item-Einträge im Warenkorb
//   function createItemEntryHtml(item) {
//     const itemInCart = `<div class="cart__item">

//   <img
//        class="cart__img"
//        src="${productImages[item.image]}"
//        alt="Verpackung der Kaffeesorte Costa Rica"
//      />

//      <div class="cart__item-title h3">${item.productName}</div>
//      <div class="cart__quantity paragraph">+ 1 -</div>
//      <div class="cart__status paragraph">sofort versandbereit</div>
//      <div class="cart__price h1-sub">${(item.price / 100).toFixed(2)}€</div>

//      <button class="cart__item-delete" data-item-id="${item.id}">
//      <img class="cart__close__svg" src="${productSvgs["burger-close-white"]}">
//      </button>
//   <hr class="cart__hr">
//   </div>`;
//     return itemInCart;
//   }

//   // Für jedes Item im Warenkorb (currentCartItems-Array) wird die
//   // function createItemEntry ausgeführt und dann alle Einträge in den Container gepackt

//   const allItemsInCart = currentCartItems.map(createItemEntryHtml).join("");
//   const cartFlexContainer = document.querySelector(".cart__flex-container");
//   cartFlexContainer.innerHTML = allItemsInCart;

//   // EventListener für alle "löschenButtons"

//   const deleteItemButtons = document.querySelectorAll(".cart__item-delete");
//   deleteItemButtons.forEach((deleteItemButton) => {
//     deleteItemButton.addEventListener("click", deleteThisItem);
//   });
//   calculatePrice();
// }

// createShoppingCard();

// /// ///////////////////////////////////////////////////////////////////////////////////////////////////
// /// // LÖSCHEN AUS DEM WARENKORB
// /// ///////////////////////////////////////////////////////////////////////////////////////////////////

// // Function zum löschen eines Items aus dem Warenkorb
// function deleteThisItem() {
//   // den aktuellen Warenkorb-Inhalt aus dem local storage suchen
//   const currentCartItems = JSON.parse(localStorage.getItem("cart"));

//   const idDeleteThisItem = parseInt(this.dataset.itemId, 10);
//   const itemToDelete = currentCartItems.find(
//     (currentCartItem) => currentCartItem.id === idDeleteThisItem
//   );

//   // i ist der Index im Array von dem Item das gelöscht werden soll
//   const i = currentCartItems.indexOf(itemToDelete);

//   const filteredItems = currentCartItems
//     .slice(0, i)
//     .concat(currentCartItems.slice(i + 1, currentCartItems.length));

//   localStorage.setItem("cart", JSON.stringify(filteredItems));
//   if (filteredItems.length === 0) {
//     cartCounterSpan.style.display = "none";
//   } else {
//     cartCounterSpan.innerHTML = `${filteredItems.length}`;
//   }
//   createShoppingCard();
// }

// /// ///////////////////////////////////////////////////////////////////////////////////////////////////
// /// // PREIS BERECHNEN UND ANZEIGEN
// /// ///////////////////////////////////////////////////////////////////////////////////////////////////

// function calculatePrice() {
//   // den aktuellen Warenkorb-Inhalt aus dem local storage suchen
//   const currentCartItems = JSON.parse(localStorage.getItem("cart"));
//   const allPricesArray = currentCartItems.map((item) => item.price);
//   let subTotal = 0;
//   for (let i = 0; i < allPricesArray.length; i++) {
//     subTotal += allPricesArray[i];
//   }

//   const shipping = 390;
//   const totalAmount = subTotal + shipping;

//   const subTotalFixed = (subTotal / 100).toFixed(2);
//   const totalAmountFixed = (totalAmount / 100).toFixed(2);

//   const subTotalSpan = document.getElementById("sub-total");
//   subTotalSpan.innerHTML = `${subTotalFixed}€`;
//   const shippingSpan = document.getElementById("shipping");
//   shippingSpan.innerHTML = `${(shipping / 100).toFixed(2)}€`;
//   const totalAmountSpan = document.getElementById("total-amount");
//   totalAmountSpan.innerHTML = `${totalAmountFixed}€`;
// }

// export default createShoppingCard;
