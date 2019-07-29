'use strict';

(function () {
  var buttons = document.querySelectorAll('.img-filters__button');
  var imgFiltersForm = document.querySelector('.img-filters__form');
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  var popularButton = document.querySelector('#filter-popular');
  var newButton = document.querySelector('#filter-new');
  var inerestingButton = document.querySelector('#filter-discussed');

  imgFiltersForm.addEventListener('click', function (evt) {
    evt.preventDefault();

    var target = evt.target;

    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains('img-filters__button--active')) {
        buttons[i].classList.remove('img-filters__button--active');
      }
    }
    target.classList.add('img-filters__button--active');
  });

  popularButton.addEventListener('click', function () {
    setTimeout(function () {
      window.render(window.photos);
    }, 500);
  });

  newButton.addEventListener('click', function () {
    window.debounce(window.updateNewPhotos);
  });

  inerestingButton.addEventListener('click', function () {
    window.debounce(window.updateInterestingPhotos);
  });
})();
