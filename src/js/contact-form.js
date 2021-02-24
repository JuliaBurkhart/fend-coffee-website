/// Variablen für Kontaktformular und Pflicht-Inputs

const contactForm = document.querySelector('[name="contact-form"]');
const nameInput = document.querySelector('[name="name"]');
const emailInput = document.querySelector('[name="email"]');
const privacyCheckbox = document.getElementById("privacy-check__checkbox");
const privacyLabel = document.querySelector(".privacy-check__label");

// Checkbox soll auf Tastendruck gechecked werden können

privacyLabel.addEventListener("keydown", function () {
  switch (privacyLabel.getAttribute("aria-checked")) {
    case "true":
      privacyLabel.setAttribute("aria-checked", "false");
      privacyCheckbox.checked = false;
      break;
    case "false":
      privacyLabel.setAttribute("aria-checked", "true");
      privacyCheckbox.checked = true;
      break;
    default:
      break;
  }
});

// Evtl. Fehlermeldungen zurücksetzen

nameInput.addEventListener("blur", function () {
  if (nameInput.value.length >= 2) {
    nameInput.classList.remove("invalid-form");
    nameInput.setCustomValidity("");
  }
});

emailInput.addEventListener("blur", function () {
  if (emailInput.value.length >= 5 || emailInput.value.includes("@")) {
    emailInput.classList.remove("invalid-form");
    emailInput.setCustomValidity("");
  }
});

privacyCheckbox.addEventListener("change", function () {
  if (privacyCheckbox.checked === true) {
    privacyLabel.classList.remove("invalid-checkbox");
  }
});

// Beim Senden den Inhalt des Formulars überprüfen

contactForm.addEventListener("submit", function (event) {
  console.log("Form submitted");

  /// Variablen für den aktuellen Inhalt der Inputs

  const customerName = event.currentTarget.name.value;
  const emailAdress = event.currentTarget.email.value;

  if (customerName.length < 2) {
    console.log("Name fehlt");

    nameInput.classList.add("invalid-form");
    nameInput.setCustomValidity("Bitte trage hier noch deinen Namen ein!");
    event.preventDefault();
  } else if (emailAdress.length < 5 || !emailAdress.includes("@")) {
    console.log("Mailadresse fehlt");

    emailInput.classList.add("invalid-form");
    emailInput.setCustomValidity(
      "Bitte trage hier noch deine E-Mail Adresse ein!"
    );
    event.preventDefault();
  } else if (privacyCheckbox.checked == false) {
    console.log("Checkbox nicht gecheckt.");

    privacyLabel.classList.add("invalid-checkbox");
    event.preventDefault();
  } else {
    alert("Alles richtig!");
  }
});
