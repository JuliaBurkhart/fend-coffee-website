import products from "./products.json";
import productImages from "../images/products/*.png";
import productSvgs from "../images/*.svg";

const sliderDiv = document.querySelector(".slider");
const sliderContainer = document.querySelector(".slider__container");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

/// ////////// Alle Produkte in den Slider laden:

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
  <p class="paragraph price">${(product.price / 100).toFixed(2)}€</p>
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

function createSliderSection() {
  const typesCardTemplate = products.map(createTypesCard).join("");
  sliderContainer.innerHTML = typesCardTemplate;
}

createSliderSection();

/// ///// SLIDER FUNKTION /////////////////////

const slides = document.querySelectorAll(".product-card"); // alle einzelnen slides

console.log(slides.length); // So viele einzelne Slides gibt es

const sliderSize = sliderDiv.offsetWidth; // Breite des gesamten Sliders
console.log(sliderSize);
let currentSlide = 0;

function moveSlides() {
  console.log(currentSlide);
  sliderContainer.style.transform = `translateX(-${currentSlide * 155}px)`;
}

function moveSlidesNext() {
  if (currentSlide >= slides.length - 1) {
    currentSlide = 0;
    moveSlides();
  } else {
    currentSlide += 1;
    moveSlides();
  }
}

function moveSlidesBack() {
  if (currentSlide <= 0) {
    currentSlide = slides.length - 1;
    moveSlides();
  } else {
    currentSlide -= 1;
    moveSlides();
  }
}

nextButton.addEventListener("click", moveSlidesNext);
previousButton.addEventListener("click", moveSlidesBack);
