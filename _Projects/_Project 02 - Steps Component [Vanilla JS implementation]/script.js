"use strict";

const messages = [
  `Learn React ⚛️`,
  `Apply for jobs 💼`,
  `Invest your new income 🤑`,
];

const steps = document.querySelectorAll(`.step`);
const message = document.querySelector(`.message`);
const btnPrevious = document.querySelector(`.previous`);
const btnNext = document.querySelector(`.next`);
const modal = document.querySelector(`.steps`);
const btnClose = document.querySelector(`.close`);

let step = 1;
let isModalOpen = true;

const updateUIValues = function () {
  message.textContent = `Step ${step}: ${messages[step - 1]}`;
  steps.forEach((s, i) => s.classList.toggle(`active`, step >= i + 1));
};

updateUIValues();

btnPrevious.addEventListener(`click`, function () {
  if (step > 1) step -= 1;
  updateUIValues();
});

btnNext.addEventListener(`click`, function () {
  if (step < messages.length) step += 1;
  updateUIValues();
});

btnClose.addEventListener(`click`, function () {
  isModalOpen = !isModalOpen;
  modal.classList.toggle(`hidden`, !isModalOpen);
  btnClose.innerHTML = isModalOpen
    ? `<i class="fa-solid fa-xmark"></i>`
    : `<i class="fa-solid fa-eye"></i>`;
});
