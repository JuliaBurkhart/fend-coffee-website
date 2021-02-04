// console.log("JS läuft!");

const navbarDiv = document.body.querySelector(".navbar");
const burgerButton = document.body.querySelector(".navbar__burger");
const closeButton = document.body.querySelector(".navbar__close");
const navbarLogo = document.body.querySelector(".navbar__logo__svg");
const navbarLinks = document.body.querySelectorAll(".navbar__a");

function toggleMobilnav() {
  const mobilNav = document.body.querySelector(".navbar__mobilnav");
  mobilNav.classList.toggle("navbar__mobilnav-full");
  closeButton.classList.toggle("navbar__close-visible");
  console.log("Mobilnav Fullscreen Toggle");
}

burgerButton.addEventListener("click", toggleMobilnav);
closeButton.addEventListener("click", toggleMobilnav);

window.addEventListener("scroll", function (event) {
  let scrollPosition = window.scrollY;
  console.log("scrollPosition: " + scrollPosition);
  const header = document.body.querySelector("header");
  let headerEnd = header.scrollHeight - 14;
  console.log(headerEnd);
  if (scrollPosition > headerEnd) {
    navbarDiv.classList.add("navbar--white-bg");
    navbarLogo.classList.add("navbar__logo__svg--black");
    burgerButton.classList.add("navbar__burger--black");

    navbarLinks.forEach(function (navbarLink) {
      navbarLink.classList.add("navbar__a--black");
    });
  } else {
    navbarDiv.classList.remove("navbar--white-bg");
    navbarLogo.classList.remove("navbar__logo__svg--black");
    burgerButton.classList.remove("navbar__burger--black");
    navbarLinks.forEach(function (navbarLink) {
      navbarLink.classList.remove("navbar__a--black");
    });
  }
});
