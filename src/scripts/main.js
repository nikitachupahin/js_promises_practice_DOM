'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 && !clicked) {
      clicked = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let clickedLeft = false;
  let clickedRight = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clickedLeft = true;
    }

    if (e.button === 2) {
      clickedRight = true;
    }

    if (clickedLeft && clickedRight) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (ev) => ev.preventDefault());
});

const onSuccess = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;

  document.body.appendChild(div);
};

const onError = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = message;

  document.body.appendChild(div);
};

firstPromise.then(onSuccess).catch(onError);
secondPromise.then(onSuccess).catch(onError);
thirdPromise.then(onSuccess).catch(onError);
