let tip = 0;
const tipButtons = document
  .querySelector("#btn-container")
  .querySelectorAll("button");
console.log(tipButtons);
function tipGenerator(button, percent) {
  button.addEventListener("click", (e) => {
    tip = Number(percent / 100);
    if (tip !== 0) {
      tipButtons.forEach((btn) => {
        btn.style.backgroundColor = "#00474b";
        btn.style.color = "#ffffff";
      });
    }
    e.target.style.backgroundColor = "#9fe8df";
    e.target.style.color = "#00474b";
    console.log(tip, typeof tip);
    activateReset();
  });
}

const tip5 = document.getElementById("5%tip");
const tip10 = document.getElementById("10%tip");
const tip15 = document.getElementById("15%tip");
const tip25 = document.getElementById("25%tip");
const tip50 = document.getElementById("50%tip");

tipGenerator(tip5, 5);
tipGenerator(tip10, 10);
tipGenerator(tip15, 15);
tipGenerator(tip25, 25);
tipGenerator(tip50, 50);

const billInput = document.getElementById("bill-input");
const tipInput = document.getElementById("custom");
const personInput = document.getElementById("person-input");

const tipAmount = document.getElementById("tip-sum");
const totalPerPerson = document.getElementById("total-sum");

const error = document.getElementById("error");
const reset = document.getElementById("reset");

personInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    reset.click();
  }
});

function activateReset() {
  if (
    billInput.value !== "" ||
    tipInput.value !== "" ||
    personInput.value !== "" ||
    tip !== 0
  ) {
    reset.disabled = false;
  }
}
let count = 0;
let total = 0;

reset.addEventListener("click", () => {
  let bill = Number(billInput.value);
  let costumeTip = Number(tipInput.value);
  let perPerson = Number(personInput.value);
  count++;

  if ((tip === 0 && tipInput.value === "") || bill <= 0) {
    error.style.display = "block";
    setTimeout(() => location.reload(), 2000);
  }

  if (personInput.value === "") {
    error.style.display = "block";
    personInput.style.border = "2px solid #e17052";
    setTimeout(() => location.reload(), 2000);
  } else if (tipInput.value !== "") {
    total = (bill + (bill * costumeTip) / 100) / perPerson;
    totalPerPerson.textContent = `$${total.toFixed(2)}`;
    tipAmount.textContent = `$${((bill * costumeTip) / 100).toFixed(2)}`;
  } else if (tipInput.value === "") {
    total = (bill + bill * tip) / perPerson;
    totalPerPerson.textContent = `$${total.toFixed(2)}`;
    tipAmount.textContent = `$${(bill * tip).toFixed(2)}`;
  }

  if (count % 2 === 0) {
    location.reload();
  }
});

let inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    activateReset();
  });
});
