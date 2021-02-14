console.log("JS läuft");

const sliderDiv = document.querySelector(".slider");
const sliderContainer = document.querySelector(".slider__container");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

transitionTime = 3000;

 const slides = document.querySelectorAll(".product-card"); //alle einzelnen slides

 console.log(slides.length); //So viele einzelne Slides gibt es 

 const sliderSize = sliderDiv.offsetWidth; //Breite des gesamten Sliders
 console.log(sliderSize);
let currentSlide = 0;


function moveSlides() {
console.log(currentSlide);
 sliderContainer.style.transform = `translateX(-${currentSlide * 155}px)`;

}

function moveSlidesNext() {
    if (currentSlide >= slides.length -1) {
        currentSlide = 0;
        moveSlides();
    } else {
    currentSlide = currentSlide + 1;
    moveSlides();
}}

function moveSlidesBack() {
if (currentSlide <= 0) {
    currentSlide = slides.length -1;
    moveSlides();
} else {
    currentSlide = currentSlide - 1;
    moveSlides();
}
    }

nextButton.addEventListener("click", moveSlidesNext);
previousButton.addEventListener("click", moveSlidesBack);