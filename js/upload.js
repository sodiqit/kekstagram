'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var el = templateSuccess.cloneNode(true);
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var elError = templateError.cloneNode(true);

  var renderErrorPopup = function () {
    document.body.appendChild(elError);
    elError.classList.add('visually-hidden');
  };

  renderErrorPopup();

  var errorButtons = document.querySelectorAll('.error__button');
  var label = document.querySelector('.img-upload__label');
  var click = function (evt) {
    evt.preventDefault();
    elError.classList.add('visually-hidden');
    label.click();
  };

  var refreshSubmit = function () {
    window.backend.save(new FormData(form), function () {
      window.closeImgOverlay();
      renderSuccessPopup();
      openSuccessPopup(el);
      window.uploadFile.value = '';
      window.hashtagInput.value = '';
      window.textDescription.value = '';
    }, window.error, function () {
      openSuccessPopup(elError);
    });
  };

  errorButtons[0].addEventListener('click', function () {
    refreshSubmit();
  });

  errorButtons[1].addEventListener('click', click);

  var renderSuccessPopup = function () {
    document.body.appendChild(el);
  };
  var closeSuccessPopup = function (element) {
    element.classList.add('visually-hidden');
  };
  var openSuccessPopup = function (element) {
    element.classList.remove('visually-hidden');
  };

  var successButton = el.querySelector('.success__button');

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      window.closeImgOverlay();
      renderSuccessPopup();
      openSuccessPopup(el);
      window.uploadFile.value = '';
      window.hashtagInput.value = '';
      window.textDescription.value = '';
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    }, window.error, function () {
      openSuccessPopup(elError);
    });

    evt.preventDefault();
  });

  successButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeSuccessPopup(el);
  });
})();

