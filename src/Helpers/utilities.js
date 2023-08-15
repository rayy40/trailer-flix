export const slideLeft = (carouselRef, indicatorsRef) => {
  if (carouselRef.current.scrollLeft !== 0) {
    carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    for (let i = 0; i < indicatorsRef.current.children.length; i++) {
      if (indicatorsRef.current.children[i].className === "active") {
        console.log(indicatorsRef.current.children[i]);
        if (indicatorsRef.current.children[i].previousSibling) {
          indicatorsRef.current.children[i].previousSibling.classList.add(
            "active"
          );
          indicatorsRef.current.children[i].classList.remove("active");
          break;
        }
      }
    }
  }
};

export const slideRight = (carouselRef, indicatorsRef) => {
  carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
  for (let i = 0; i < indicatorsRef.current.children.length; i++) {
    if (indicatorsRef.current.children[i].className === "active") {
      if (indicatorsRef.current.children[i].nextSibling) {
        indicatorsRef.current.children[i].nextSibling.classList.add("active");
        indicatorsRef.current.children[i].classList.remove("active");
        break;
      }
    }
  }
};

export const setTabs = (carouselRef, indicatorsRef) => {
  for (let i = 0; i < 4; i++) {
    let indicator = document.createElement("button");
    let tab_indicator = carouselRef.current;
    if (i === 0) {
      indicator.classList.add("active");
    }
    indicatorsRef.current.appendChild(indicator);
    indicator.addEventListener("click", (e) => {
      tab_indicator.scrollLeft = i * tab_indicator.offsetWidth;
      for (let i = 0; i < 4; i++) {
        if (indicatorsRef.current.children[i].className === "active") {
          indicatorsRef.current.children[i].classList.remove("active");
          e.target.classList.add("active");
          break;
        }
      }
    });
  }
};
