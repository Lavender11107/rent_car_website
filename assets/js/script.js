'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}



/**
 * header active on scroll
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});
/**
 * Car search and filtering
 */
const searchForm = document.querySelector(".hero-form");
const carSearchInput = document.querySelector("#input-1");
const maxPaymentInput = document.querySelector("#input-2");
const minYearInput = document.querySelector("#input-3");
const carCards = document.querySelectorAll(".featured-car-list > li");
const noResults = document.querySelector("#no-results");

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchTerm = carSearchInput ? carSearchInput.value.trim().toLowerCase() : "";
    const maxPayment = maxPaymentInput && maxPaymentInput.value ? Number(maxPaymentInput.value) : null;
    const minYear = minYearInput && minYearInput.value ? Number(minYearInput.value) : null;

    let visibleCars = 0;

    carCards.forEach(function (card) {
      const titleElem = card.querySelector(".card-title a");
      const yearElem = card.querySelector(".year");
      const priceElem = card.querySelector(".card-price strong");

      const carName = titleElem ? titleElem.textContent.toLowerCase() : "";
      const carYear = yearElem ? Number(yearElem.textContent) : 0;
      const carPrice = priceElem ? Number(priceElem.textContent.replace(/[^0-9.]/g, "")) : 0;

      const matchesName = !searchTerm || carName.includes(searchTerm);
      const matchesPrice = maxPayment === null || carPrice <= maxPayment;
      const matchesYear = minYear === null || carYear >= minYear;

      if (matchesName && matchesPrice && matchesYear) {
        card.style.display = "";
        visibleCars++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResults) {
      noResults.hidden = visibleCars !== 0;
    }

    const featuredCarSection = document.querySelector("#featured-car");
    if (featuredCarSection) {
      featuredCarSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}
