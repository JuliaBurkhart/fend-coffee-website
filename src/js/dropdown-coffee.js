console.log("JS läuft");

// Variablen für die Tasten

const SPACEBAR_KEY_CODE = [0, 32];
const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;

const dropdownBar = document.querySelector(".dropdown-bar");
const dropdownButton = document.querySelector(".dropdown-bar__button");
const dropdownContent = document.querySelector(".dropdown-content");
const contentItems = document.querySelectorAll(".dropdown-content__li");
const dropdownBarText = document.querySelector(".dropdown-bar__text");

// Für alle Listenpunkte werden die IDs in ein Array gepackt (wichtig für die Arrow-Keys)
const listItemIds = [];
contentItems.forEach((item) => listItemIds.push(item.id));

/// //////////////////////// FUNCTIONS ///////////////////////////////

// Open Dropdown Menü
function openDropdownContent() {
  dropdownContent.classList.add("show-dropdown-content");
  dropdownContent.setAttribute("aria-expanded", true);
  dropdownButton.classList.add("dropdown-bar__button-rotate");
  dropdownBar.classList.add("dropdown-bar--dark");
  dropdownBarText.classList.add("dropdown-bar__text--white");
}

// Close Dropdown Menü
function closeDropdownContent() {
  dropdownContent.classList.remove("show-dropdown-content");
  dropdownContent.setAttribute("aria-expanded", false);
  dropdownButton.classList.remove("dropdown-bar__button-rotate");
  dropdownBar.classList.remove("dropdown-bar--dark");
  dropdownBarText.classList.remove("dropdown-bar__text--white");
}

// Einen Listenpunkt auswählen! Braucht als Input das Event, also welcher Listenpunkt geklickt wurde, um den Text des Listenpunktes auszulesen
function listItemSelected(event) {
  const selectedTextToAppend = document.createTextNode(event.target.innerText);
  dropdownBarText.innerHTML = null;
  dropdownBarText.appendChild(selectedTextToAppend);
}

// Function die mit den Arrow Keys das nächste oder vorherige Listenitem auswählt
function focusNextListItem(direction) {
  // Die ID des aktiven Listenpunktes
  const activeElementId = document.activeElement.id;
  // Von der ID des aktuellen Listenpunktes den Index im Array finden
  const currentActiveElementIndex = listItemIds.indexOf(activeElementId);

  // Wenn der Button geklickt wurde dann
  if (activeElementId === "dropdown__button") {
    document.querySelector(`#dropdown__li--1`).focus();

    // Den nächsten ElementIndex ausrechen und das zugehörige Element focussieren
  } else if (
    direction === 40 &&
    currentActiveElementIndex !== listItemIds.length - 1
  ) {
    const nextListItemIndex = currentActiveElementIndex + 1;
    const nextListItemId = listItemIds[nextListItemIndex];
    document.querySelector(`#${nextListItemId}`).focus();
  } else if (direction === 38 && currentActiveElementIndex !== 0) {
    const nextListItemIndex = currentActiveElementIndex - 1;
    const nextListItemId = listItemIds[nextListItemIndex];
    document.querySelector(`#${nextListItemId}`).focus();
  }
}

/// ///////////////////// KEYHANDLER /////////////////////////////////////////////////////

// Function entscheidet was passiert je nachdem welche Taste gedrückt wurde
function keyHandler(event) {
  console.log(event.keyCode);
  switch (event.keyCode) {
    case ENTER_KEY_CODE:
      listItemSelected(event);
      closeDropdownContent();
      return;

    case SPACEBAR_KEY_CODE:
      listItemSelected(event);
      closeDropdownContent();
      return;

    case DOWN_ARROW_KEY_CODE:
      focusNextListItem(DOWN_ARROW_KEY_CODE);
      return;

    case UP_ARROW_KEY_CODE:
      focusNextListItem(UP_ARROW_KEY_CODE);
      return;

    case ESCAPE_KEY_CODE:
      closeDropdownContent();
      break;
    default:
      break;
  }
}

/// //////////////////////// EVENTLISTENER /////////////////////////////////////////////////////

// Der Dropdown-Pfeil bekommt einen EventListener für Mausklick und Tasten
dropdownButton.addEventListener("click", function () {
  const ariaExp = dropdownContent.getAttribute("aria-expanded");
  if (ariaExp === "false") {
    openDropdownContent();
  } else {
    closeDropdownContent();
  }
});

dropdownButton.addEventListener("keydown", function (event) {
  const ariaExp = dropdownContent.getAttribute("aria-expanded");
  if (ariaExp === "false") {
    openDropdownContent();
  } else {
    keyHandler(event);
  }
});

// Jeder Listenpunkt bekommt einen EventListener und wenn er geklickt wird, führt er 2 Functionen aus (Listenpunkt auswählen und Liste schließen)
contentItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    listItemSelected(event);
    closeDropdownContent();
  });
  item.addEventListener("keydown", keyHandler);
});
