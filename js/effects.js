'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var closeUploadOverlay = imgUploadOverlay.querySelector('.img-upload__cancel');
  window.ESC_KEYCODE = 27;

  var openimgOverlay = function () {
    imgUploadOverlay.classList.remove('hidden');

    document.addEventListener('keydown', window.pressEscClose);

    window.levelPin.style.left = 453 + 'px';
    window.levelDepth.style.width = window.levelPin.style.left;
  };

  var closeImgOverlay = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.pressEscClose);

    removeEffectClass();

    uploadFile.value = '';

    window.imgUploadPreview.style.filter = '';
  };

  window.pressEscClose = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closeImgOverlay();
    }
  };

  uploadFile.addEventListener('change', function () {
    openimgOverlay();
  });

  closeUploadOverlay.addEventListener('click', function () {
    closeImgOverlay();
  });

  // show editor img - end

  // add effects on img - start

  var imgEffectsList = document.querySelectorAll('.effects__preview');
  window.imgUploadPreview = document.querySelector('.img-upload__preview');
  var list = document.querySelector('.effects__list');

  var removeEffectClass = function () {
    for (var i = 0; i < imgEffectsList.length; i++) {
      window.imgUploadPreview.classList.remove(imgEffectsList[i].classList[1]);
    }
  };

  list.addEventListener('click', function (evt) {
    var target = evt.target;
    var value = target.classList[1];

    window.imgUploadPreview.classList.add(value);
    window.imgUploadPreview.classList.remove('visually-hidden');
    window.imgUploadPreview.classList.remove('undefined');

    window.levelPin.style.left = 453 + 'px';
    window.levelDepth.style.width = window.levelPin.style.left;

    window.checkEffect(window.imgUploadPreview.classList[1], 453);

    if (window.imgUploadPreview.classList.length > 2) {
      removeEffectClass();
      window.imgUploadPreview.classList.add(value);
    }
  });

  // add effects on img - end
})();
