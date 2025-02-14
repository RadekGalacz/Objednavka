const option = document.querySelector("#krmiva");
const kilogram = document.querySelector("#kilogram");
const totalAmount = document.querySelector("#price");
const totalPrice = document.querySelector("#sum");
const radioForm = document.querySelector("#radioForm");
const mail = document.querySelector("#mail");
const amountToSpend = document.querySelector("#amountToSpend");
const radioButtonsWrap = document.querySelectorAll('input[name="quality"]');
const radioButtonsTransport = document.querySelectorAll(
  'input[name="transport"]'
);
const paragraph = document.querySelector("p");

// Vstupní hodnoty
let amount = 0; // zadané množství krmiva
let price = 0; // cena krmiva dle vybraného zvířete
let priceSum = 0; // základní cena (price * amount)
let priceQuality = 0; // cena po připočítání kvality
let priceTotal = 0; // celková cena (priceQuality + cena za dopravu)

// Funkce pro aktualizaci celkové ceny
function updateTotalPrice() {
  priceSum = price * amount;
  totalAmount.value = priceSum.toFixed(2);

  // Kvalita
  switch (document.querySelector('input[name="quality"]:checked')?.id) {
    case "bio":
      priceQuality = priceSum * 1.3;
      break;
    case "extraPrem":
      priceQuality = priceSum * 1.5;
      break;
    case "extraNek":
      priceQuality = priceSum * 0.85;
      break;
    case "giftWrap":
      priceQuality = priceSum + 500;
      break;
    default:
      priceQuality = priceSum;
      break;
  }

  // Doprava
  switch (document.querySelector('input[name="transport"]:checked')?.id) {
    case "personal":
      priceTotal = priceQuality;
      break;
    case "firm":
      priceTotal = priceQuality * 1.1;
      break;
    case "CP":
      priceTotal = priceQuality + 250;
      break;
    default:
      priceTotal = priceQuality;
      break;
  }
  // Aktualizace celkové ceny na stránce
  document.querySelector('input[name="quality"]:checked') ||
  document.querySelector('input[name="transport"]:checked')
    ? (totalPrice.value = priceTotal.toFixed(2))
    : (totalPrice.value = "");
}

// Výběr druhu žrádla
option.addEventListener("change", (e) => {
  const pet = e.target.value;
  switch (pet) {
    case "dog":
      price = 150;
      break;
    case "cat":
      price = 120;
      break;
    case "fish":
      price = 50;
      break;
    case "tiger":
      price = 800;
      break;
    default:
      price = 0;
      break;
  }
  updateTotalPrice();
});

// Zadání množství žrádla
kilogram.addEventListener("input", (e) => {
  amount = parseInt(e.target.value) || 0;
  updateTotalPrice();
});

// Výběr kvality zboží
radioButtonsWrap.forEach((radio) => {
  radio.addEventListener("change", updateTotalPrice); // Aktualizace ceny při změně kvality
});

// Výběr dopravy
radioButtonsTransport.forEach((radio) => {
  radio.addEventListener("change", updateTotalPrice); // Aktualizace ceny při změně dopravy
});

//Částka k utracení
radioForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Výpis do stránky

  console.log(amountToSpend.value);

  if (amountToSpend.value !== "" && totalPrice.value !== "") {
    if (amountToSpend.value - priceTotal >= 0) {
      paragraph.classList.add("true");
      paragraph.classList.remove("false");
    } else {
      paragraph.classList.add("false");
      paragraph.classList.add("true");
    }
    amountToSpend.value - priceTotal >= 0
      ? (paragraph.innerText = "Vaše částka pro koupi zboží je dostatečná")
      : (paragraph.innerText =
          "S Vaší částkou se do celkové ceny zboží nevejdete");
  }
});

mail.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
});
