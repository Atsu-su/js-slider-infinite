'use strict';

const buttons = document.querySelectorAll('.button');
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');
const outer = document.querySelector('.outer');
const outerWidth = parseInt(window.getComputedStyle(outer).width);
const inner = document.querySelector('.inner');
const innerGap = parseInt(window.getComputedStyle(inner).gap);
const elements = document.querySelectorAll('.element:not(.clone)').length;
const element = document.querySelector('.element');
const elementWidth = parseInt(window.getComputedStyle(element).width);
const distance = innerGap + elementWidth;
const circleWrapper = document.querySelector('.circle-wrapper');
const innerInitPos = -(elementWidth * 5 + innerGap * 4) / 2;
const duration = 0.5;
let count = 0;

// -----------------------
// Function
// -----------------------

const setProp = (direction) => {
  document.documentElement.style.setProperty('--start', - distance * count + 'px');
  direction === 'left' ?
  document.documentElement.style.setProperty('--end', (- distance * (count + 1)) + 'px') :
  document.documentElement.style.setProperty('--end', (- distance * (count - 1)) + 'px')
}

const btnDisabled = (bool) => {
  bool === true ?
  buttons.forEach((button) => { button.disabled = true }):
  buttons.forEach((button) => { button.disabled = false });
}

const slide = () => {
  btnDisabled(true);
  inner.classList.add('animation-slide');
  setTimeout(() => {
    inner.style.transform = 'translate(' + innerInitPos + 'px, -50%)' +' translateX(' + (-distance * count) + 'px)';
    inner.classList.remove('animation-slide');

    if (count === -1) count = elements - 1;
    if (count === elements) count = 0;

    btnDisabled(false);
  }, duration * 1000);
}

const createCircles = () => {
  for (let i = 1; i <= elements; ++i) {
    const newCircle = document.createElement('div');
    newCircle.classList.add('circle', 'circle' + i);
    circleWrapper.appendChild(newCircle);
  }
}

const setOpacity = () => {
  const circleSelected = document.querySelector('.circle-selected');
  let circle;
  if (count === elements) {
    circle = document.querySelector('.circle' + 1);
  } else if (count === -1) {
    circle = document.querySelector('.circle' + elements);
  } else {
    circle = document.querySelector('.circle' + (count + 1));
  }

  if (circleSelected !== null) {
    circleSelected.classList.remove('circle-selected');
  }
  circle.classList.add('circle-selected');
}

// -----------------------
// Main
// -----------------------

window.onload = () => {

  setPageTitle();

  document.documentElement.style.setProperty('--duration', duration + 's');
  document.documentElement.style.setProperty('--position', innerInitPos + 'px');
  createCircles();
  setOpacity();

  // -----------------------
  // イベントの追加
  // -----------------------

  buttonLeft.addEventListener('click', () => {
    if (count < elements) {
      setProp('left');
      ++count;
      slide();
      setOpacity();
    }
  });

  buttonRight.addEventListener('click', () => {
    if (count > -1) {
      setProp('right');
      --count;
      slide();
      setOpacity();
    }
  });
}