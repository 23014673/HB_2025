'use strict';

const sliders = document.querySelectorAll("[data-slider]");

const sliderInit = function (currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  const totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
  const totalSliderItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

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