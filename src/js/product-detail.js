import products from "./products.json";
import productImages from "../images/products/*.png";
import productSvgs from "../images/*.svg";

// Die URL auslesen
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Daraus die ID suchen
const currentId = parseInt(urlParams.get("id"), 10);

// Das entsprechende Object aus dem Array suchen
const currentProduct = products.find((product) => product.id === currentId);

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
   <p class="paragraph price u-margin-bottom-small u-margin-top-small">${
     currentProduct.price
   }</p>
  
  <p class="paragraph">Costa Rica Filterkaffee ist äußerst ergiebig und hat praktisch keine Säure. Den Gaumen umschmeichelt ein vollmundiges Haselnussaroma. Gleich probieren!</p>

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
<button class="true-button">In den Warenkorb</button>
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
