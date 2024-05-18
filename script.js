document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name-input");
  const numberInput = document.getElementById("number-input");
  const monthInput = document.getElementById("month-input");
  const yearInput = document.getElementById("year-input");
  const cvcInput = document.getElementById("cvc-input");
  const confirmButton = document.getElementById("confirm-button");

  const cardName = document.getElementById("card-name");
  const cardNumber = document.getElementById("card-number");
  const cardExpiry = document.getElementById("card-expiry");
  const cardCvc = document.getElementById("card-cvc");

  const nameError = document.getElementById("name-error");
  const numberError = document.getElementById("number-error");
  const dateError = document.getElementById("date-error");
  const cvcError = document.getElementById("cvc-error");

  function updateCardDetails() {
    cardName.textContent = nameInput.value || "Jane Appleseed";
    cardNumber.textContent = formatCardNumber(numberInput.value) || "0000 0000 0000 0000";
    cardExpiry.textContent = `${monthInput.value || "00"}/${yearInput.value || "00"}`;
    cardCvc.textContent = cvcInput.value || "000";
  }

  function formatCardNumber(number) {
    return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }

  function validateInputs() {
    let valid = true;

    const numberPattern = /^[0-9\s]*$/;
    const number = numberInput.value.replace(/\s/g, '');

    nameError.textContent = "";
    numberError.textContent = "";
    dateError.textContent = "";
    cvcError.textContent = "";

    if (!nameInput.value) {
      nameError.textContent = "Cardholder name is required.";
      valid = false;
    }

    if (!numberInput.value) {
      numberError.textContent = "Card number is required.";
      valid = false;
    } else if (!numberPattern.test(numberInput.value)) {
      numberError.textContent = "Card number must contain only digits.";
      valid = false;
    } else if (number.length !== 16) {
      numberError.textContent = "Card number must be exactly 16 digits.";
      valid = false;
    }

    if (!monthInput.value || !yearInput.value) {
      dateError.textContent = "Expiration date is required.";
      valid = false;
    } else if (monthInput.value < 1 || monthInput.value > 12) {
      dateError.textContent = "Expiration month must be between 01 and 12.";
      valid = false;
    } else if (yearInput.value.length !== 2 || isNaN(yearInput.value)) {
      dateError.textContent = "Expiration year must be a valid 2-digit number.";
      valid = false;
    }

    if (!cvcInput.value) {
      cvcError.textContent = "CVC is required.";
      valid = false;
    } else if (cvcInput.value.length !== 3 || isNaN(cvcInput.value)) {
      cvcError.textContent = "CVC must be a 3-digit number.";
      valid = false;
    }

    return valid;
  }

  nameInput.addEventListener("input", updateCardDetails);
  numberInput.addEventListener("input", updateCardDetails);
  monthInput.addEventListener("input", updateCardDetails);
  yearInput.addEventListener("input", updateCardDetails);
  cvcInput.addEventListener("input", updateCardDetails);

  confirmButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (validateInputs()) {
      alert("Card details added successfully!");
      // Limpar os campos de entrada
      nameInput.value = "";
      numberInput.value = "";
      monthInput.value = "";
      yearInput.value = "";
      cvcInput.value = "";
      // Atualizar os detalhes do cartão com valores padrão
      updateCardDetails();
    }
  });
});
