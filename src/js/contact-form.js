// const dropdownButton = document.querySelector(".dropdown-button");

// dropdownButton.addEventListener("click", function () {
//   console.log("Dropdown-Button wurde geklickt");
//   document
//     .querySelector(".dropdown-content")
//     .classList.toggle("show-dropdown-content");
// });

const contactForm = document.querySelector('[name="contact-form"]');

contactForm.addEventListener("submit", function (event) {
  console.log("Form submitted");

  const customerName = event.currentTarget.name.value;
  const emailAdress = event.currentTarget.email.value;
  const privacyCheckbox = document.getElementById("privacy-check__checkbox");

  console.log(event.currentTarget);

  if (customerName.length < 2) {
    console.log("Name fehlt");
    document.querySelector('[name="name"]').classList.add("invalid-form");
    event.preventDefault();
  } else if (emailAdress.length < 2) {
    console.log("Mailadresse fehlt");
    document.querySelector('[name="email"]').classList.add("invalid-form");
    event.preventDefault();
  } else if (!emailAdress.includes("@")) {
    console.log("Keine korrekte Mailadresse");
    document.querySelector('[name="email"]').classList.add("invalid-form");
    event.preventDefault();
  } else if (privacyCheckbox.checked == false) {
    console.log("Checkbox nicht gecheckt");

    document
      .querySelector(".privacy-check__label")
      .classList.add("invalid-checkbox");

    event.preventDefault();
  } else {
    console.log("Alles richtig");
  }
});
