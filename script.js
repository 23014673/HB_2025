'use strict';

const sliders = document.querySelectorAll("[data-slider]");

const sliderInit = function (currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  const totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
  const totalSliderItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  /*** NAV BAR TAB SWITCHING ***/
const navItems = document.querySelectorAll(".nav-item");
const tabContents = document.querySelectorAll(".tab-content");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    // Remove active classes
    navItems.forEach(i => i.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    // Activate selected
    item.classList.add("active");
    const target = document.getElementById(item.getAttribute("data-tab"));
    if (target) target.classList.add("active");
  });
});

// Default: show first tab
document.querySelector(".tab-content").classList.add("active");

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    currentSlidePos++;
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
    if (currentSlidePos >= totalSliderItems) sliderNextBtn.setAttribute("disabled", "");
    sliderPrevBtn.removeAttribute("disabled");
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    currentSlidePos--;
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
    if (currentSlidePos <= 0) sliderPrevBtn.setAttribute("disabled", "");
    sliderNextBtn.removeAttribute("disabled");
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSliderItems <= 0;
  if (dontHaveExtraItem) sliderNextBtn.setAttribute("disabled", "");

  sliderPrevBtn.setAttribute("disabled", "");

  /**
   * BANNER VIDEO CLICK FUNCTIONALITY
   * Only applies if current slider has 'banner-slider' class
   */
  if (currentSlider.classList.contains("banner-slider")) {
    const bannerItems = sliderContainer.querySelectorAll(".slider-item");

    bannerItems.forEach(item => {
      const videoSrc = item.getAttribute("data-video");
      if (!videoSrc) return;

      item.addEventListener("click", () => {
        const card = item.querySelector(".card");

        // If video already exists, do nothing
        if (card.querySelector("video")) return;

        // Replace image with video
        card.innerHTML = `
          <video width="100%" height="100%" controls autoplay>
            <source src="${videoSrc}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        `;
      });
    });
  }
}

// Initialize all sliders
for (let i = 0, len = sliders.length; i < len; i++) {
  sliderInit(sliders[i]);
}

  // Scale the body and all sliders by 1.3 (30% bigger)
  document.addEventListener("DOMContentLoaded", () => {
    const scaleFactor = 1.2;

    // Scale the container
    const container = document.querySelector('.container');
    if (container) {
      container.style.transform = `scale(${scaleFactor})`;
      container.style.transformOrigin = 'top center'; // keeps it centered at top
    }

    // Optionally, scale the body as well if needed
    // document.body.style.transform = `scale(${scaleFactor})`;
    // document.body.style.transformOrigin = 'top center';
  });