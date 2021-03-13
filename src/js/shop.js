import products from "./products.json";
import productImages from "../images/products/*.png";
import productSvgs from "../images/*.svg";
// import createShoppingCard from "./cart";

function shop() {
  // Button und Link zum Warenkorb
  const cartContainer = document.getElementById("cart");
  const cartButton = document.querySelector(".cart__button");
  const cartLink = document.querySelector(".cart__link");
  // Zähler für die Items
  const cartCounterSpan = document.querySelector(".cart__button__counter");
  // Array mit Warenkorbinhalt
  let cart = [];

  /// ///////////////////////////////////////////////////////////////////////////////////////////////////
  /// // AKTUELLEN WARENKORB PRÜFEN
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////

  function checkLocalStorage() {
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    if (currentCart === null) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else if (currentCart.length === 0) {
      cartCounterSpan.style.display = "none";
    } else {
      cart = currentCart;
      cartCounterSpan.style.display = "block";
      cartCounterSpan.innerHTML = `${cart.length}`;
      // hier muss noch die amount eingebaut werden, die soll mit berechnet sein
    }
  }
  checkLocalStorage();

  /// ///////////////////////////////////////////////////////////////////////////////////////////////////
  /// // WARENKORB ÖFFNEN UND SCHLIEßEN
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////

  // Warenkorb öffnen und schließen
  function toggleShoppingCart() {
    if (cartContainer.classList.contains("show-cart")) {
      cartContainer.classList.remove("show-cart");
    } else {
      cartContainer.classList.add("show-cart");
      createShoppingCard();
    }
  }

  cartButton.addEventListener("click", toggleShoppingCart);
  cartLink.addEventListener("click", toggleShoppingCart);

  /// ///////////////////////////////////////////////////////////////////////////////////////////////////
  /// // SHOP SEITE
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////

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

  /// ///////////////////////////////////////////////////////////////////////////////////////////////////
  /// // PRODUKT IN DEN WARENKORB PACKEN
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////

  // Was passiert bei klick auf den add-to-cart Button?

  function handleCartButtonClick(event) {
    // Der Button für das Produkt das in den Warenkorb soll wird ausgeschaltet & Text geändert
    event.target.innerText = "In Cart";
    event.target.disabled = true;
    // rausfinden welches Produkt geklickt wurde und aus dem Array raussuchen
    const chosenProductId = parseInt(this.dataset.productId, 10);

    const findProduct = products.find(
      (product) => product.id === chosenProductId
    );
    const chosenProduct = { ...findProduct, amount: 1 };
    // add product to cart-Array
    cart = [...cart, chosenProduct];
    console.log(cart);
    // den aktuellen Warenkorb-Inhalt aus dem local storage suchen
    const currentCart = JSON.parse(localStorage.getItem("cart"));

    // Produkt im Warenkorb im local storage speichern, wenn schon was im Warenkorb drin war,
    // wird das neue Produkt ergänzt, ansonsten als erstes in den Warenkorb gepackt
    const addedSuccessfullyDiv = document.querySelector(
      ".cart__added-successfully"
    );
    console.log(addedSuccessfullyDiv);

    if (currentCart === null) {
      localStorage.setItem("cart", JSON.stringify(cart));
      // localStorage.setItem("cart", JSON.stringify([chosenProduct]));

      cartCounterSpan.style.display = "block";
      createShoppingCard();

      toggleShoppingCart();
    } else {
      // const updatedCart = [...currentCart, chosenProduct];
      // localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("cart", JSON.stringify(cart));
      cartCounterSpan.style.display = "block";

      cartCounterSpan.innerHTML = `${cart.length}`;
      // hier muss noch die amount eingebaut werden, die soll mit berechnet sein
      createShoppingCard();
      toggleShoppingCart();
      addedSuccessfullyDiv.style.display = "block";
    }
  }
  // Add-to-cart Buttons
  /// // für jeden Button wird geprüft ob das Produkt schon im Warenkorb ist. Wenn ja wird der Text geändert
  /// // und der Button aus geschaltet
  /// // wenn nicht, bekommt der Button einen EventListener

  const cartButtons = document.querySelectorAll(".add-to-cart__button");
  cartButtons.forEach((cartButton) => {
    const buttonId = cartButton.dataset.productId;
    const inCart = cart.find((item) => item.id === buttonId);
    if (inCart) {
      cartButton.innerText = "In Cart";
      cartButton.disabled = true;
    } else {
      cartButton.addEventListener("click", handleCartButtonClick);
    }
  });

  /// ///////////////////////////////////////////////////////////////////////////////////////////////////
  /// // WARENKORB ERSTELLEN
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////
  /// Die Funktion wird immer neu aufgerufen wenn ein Produkt hinzu gefügt oder gelöscht wird, damit der
  /// Warenkorb immer aktuell ist. Die Funktion ruft außerdem die Preisberechnung auf.

  function createShoppingCard() {
    // den aktuellen Warenkorb-Inhalt aus dem local storage suchen
    const currentCartItems = JSON.parse(localStorage.getItem("cart"));

    // Grundgerüst für den Warenkorb
    const cartPageHtml = `
<div class="cart__close__div">
<button class="cart__close">
    <img class="cart__close__svg" src="${productSvgs["burger-close-white"]}" alt="Warenkorb schließen" />
  </button>
  </div>
  <div class="cart__head">
<h3 class="h3">Warenkorb</h3><span class="paragraph">${currentCartItems.length} Produkte</span>
</div>
<div class="cart__added-successfully paragraph">1 Produkt wurde erfolgreich zum Warenkorb hinzugefügt</div>
<div class="cart__flex-container">
</div>

<div class="cart__order-overview__container">
<h2 class="h2 u-margin-bottom-small">Bestellübersicht</h2>
<div class="cart__order-overview__table-row">
<span class="paragraph">Zwischensumme</span>
<span class="paragraph" id="sub-total"></span>
</div>
<div class="cart__order-overview__table-row">
<span class="paragraph">Versandkosten</span>
<span class="paragraph" id="shipping"></span>   
</div>
<hr class="cart__order-overview__hr">
<div class="cart__order-overview__table-row">
<span class="paragraph">Gesamtbetrag</span>
<span class="paragraph" id="total-amount"></span>
</div>
<div class="u-align-center">
<button class="true-button--light">bezahlen</button>
  </div>
</div>
`;
    cartContainer.innerHTML = cartPageHtml;

    // Button zum Schließen des Warenkorbs
    const cartCloseButton = document.querySelector(".cart__close");
    cartCloseButton.addEventListener("click", toggleShoppingCart);

    // Function erstellt Item-Einträge im Warenkorb
    function createItemEntryHtml(item) {
      console.log(item.amount);
      const itemInCart = `<div class="cart__item">

  <img
       class="cart__img"
       src="${productImages[item.image]}"
       alt="Verpackung der Kaffeesorte Costa Rica"
     />

     <div class="cart__item-title h3">${item.productName}</div>
     <div class="cart__quantity paragraph">
     <span class="cart__minus" data-item-id="${item.id}"><</span>
     ${item.amount}
     <span class="cart__plus" data-item-id="${item.id}">></span>
    
     </div>
     <div class="cart__status paragraph">sofort versandbereit</div>
     <div class="cart__price h1-sub">${(item.price / 100).toFixed(2)}€</div>
     
     
     <button class="cart__item-delete" data-item-id="${item.id}">
     <img class="cart__close__svg" src="${productSvgs["burger-close-white"]}">
     </button>
  <hr class="cart__hr">
  </div>`;
      return itemInCart;
    }

    // Für jedes Item im Warenkorb (currentCartItems-Array) wird die
    // function createItemEntry ausgeführt und dann alle Einträge in den Container gepackt

    const allItemsInCart = currentCartItems.map(createItemEntryHtml).join("");
    const cartFlexContainer = document.querySelector(".cart__flex-container");
    cartFlexContainer.innerHTML = allItemsInCart;

    // EventListener für alle "löschenButtons"

    const deleteItemButtons = document.querySelectorAll(".cart__item-delete");
    deleteItemButtons.forEach((deleteItemButton) => {
      deleteItemButton.addEventListener("click", function () {
        const thisId = parseInt(this.dataset.itemId, 10);
        deleteThisItem(thisId);
      });
    });

    // EventListener für Plus und Minus-Tasten
    const itemPlusAll = document.querySelectorAll(".cart__plus");
    itemPlusAll.forEach((itemPlus) => {
      itemPlus.addEventListener("click", function () {
        const thisId = parseInt(this.dataset.itemId, 10);
        const thisItem = currentCartItems.find(
          (currentCartItem) => currentCartItem.id === thisId
        );
        thisItem.amount += 1;
        localStorage.setItem("cart", JSON.stringify(currentCartItems));
        createShoppingCard();
      });
    });

    const itemMinusAll = document.querySelectorAll(".cart__minus");
    itemMinusAll.forEach((itemMinus) => {
      itemMinus.addEventListener("click", function () {
        const thisId = parseInt(this.dataset.itemId, 10);
        const thisItem = currentCartItems.find(
          (currentCartItem) => currentCartItem.id === thisId
        );
        if (thisItem.amount > 1) {
          thisItem.amount -= 1;
          localStorage.setItem("cart", JSON.stringify(currentCartItems));
          createShoppingCard();
        } else {
          deleteThisItem(thisId);
        }
      });
    });

    calculatePrice();
  }

  createShoppingCard();

  /// ///////////////////////////////////////////////////////////////////////////////////////////////////
  /// // LÖSCHEN AUS DEM WARENKORB
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////

  // Function zum löschen eines Items aus dem Warenkorb
  function deleteThisItem(idDeleteThisItem) {
    // den aktuellen Warenkorb-Inhalt aus dem local storage suchen
    const currentCartItems = JSON.parse(localStorage.getItem("cart"));

    // const idDeleteThisItem = parseInt(this.dataset.itemId, 10);
    const itemToDelete = currentCartItems.find(
      (currentCartItem) => currentCartItem.id === idDeleteThisItem
    );

    // i ist der Index im Array von dem Item das gelöscht werden soll
    const i = currentCartItems.indexOf(itemToDelete);

    const filteredItems = currentCartItems
      .slice(0, i)
      .concat(currentCartItems.slice(i + 1, currentCartItems.length));

    cart = filteredItems;
    localStorage.setItem("cart", JSON.stringify(cart));
    if (filteredItems.length === 0) {
      cartCounterSpan.style.display = "none";
    } else {
      cartCounterSpan.innerHTML = `${filteredItems.length}`;
    }
    createShoppingCard();
  }

  /// ///////////////////////////////////////////////////////////////////////////////////////////////////
  /// // PREIS BERECHNEN UND ANZEIGEN
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////

  function calculatePrice() {
    // den aktuellen Warenkorb-Inhalt aus dem local storage suchen
    const currentCartItems = JSON.parse(localStorage.getItem("cart"));
    const allPricesArray = currentCartItems.map((item) => item.price);
    let subTotal = 0;
    for (let i = 0; i < allPricesArray.length; i++) {
      subTotal += allPricesArray[i];
    }

    const shipping = 390;
    const totalAmount = subTotal + shipping;

    const subTotalFixed = (subTotal / 100).toFixed(2);
    const totalAmountFixed = (totalAmount / 100).toFixed(2);

    const subTotalSpan = document.getElementById("sub-total");
    subTotalSpan.innerHTML = `${subTotalFixed}€`;
    const shippingSpan = document.getElementById("shipping");
    shippingSpan.innerHTML = `${(shipping / 100).toFixed(2)}€`;
    const totalAmountSpan = document.getElementById("total-amount");
    totalAmountSpan.innerHTML = `${totalAmountFixed}€`;
  }
}

export default shop;
