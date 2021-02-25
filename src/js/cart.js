const cartContainer = document.getElementById("cart");
const cartButton = document.querySelector(".cart__button");
const cartLink = document.querySelector(".cart__link");

function toggleShoppingCart() {
  if (cartContainer.style.display === "none") {
    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }
}

cartButton.addEventListener("click", toggleShoppingCart);
cartLink.addEventListener("click", toggleShoppingCart);
