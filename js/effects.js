'use strict';

(function () {
  window.uploadFile = document.querySelector('#upload-file');
  window.imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var closeUploadOverlay = window.imgUploadOverlay.querySelector('.img-upload__cancel');
  window.ESC_KEYCODE = 27;
  var imgChange = window.imgUploadOverlay.querySelector('.img-upload__preview > img');
  var FILES_TYPE = ['jpeg', 'gif', 'png', 'jpg'];

  var openimgOverlay = function () {
    window.imgUploadOverlay.classList.remove('hidden');

    document.addEventListener('keydown', window.pressEscClose);

    window.levelPin.style.left = 453 + 'px';
    window.levelDepth.style.width = window.levelPin.style.left;
  };

  window.closeImgOverlay = function () {
    window.imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.pressEscClose);

    removeEffectClass();

    window.uploadFile.value = '';

    window.imgUploadPreview.style.filter = '';
  };

  window.pressEscClose = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      window.closeImgOverlay();
    }
  };

  window.uploadFile.addEventListener('change', function () {
    openimgOverlay();
    var file = window.uploadFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILES_TYPE.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgChange.src = reader.result;
        for (var i = 0; i < window.imgEffectsList.length; i++) {
          window.imgEffectsList[i].style.backgroundImage = 'url(' + reader.result + ')';
        }
      });

      reader.readAsDataURL(file);
    }
  });

  closeUploadOverlay.addEventListener('click', function () {
    window.closeImgOverlay();
  });

  // show editor img - end

  // add effects on img - start

  window.imgEffectsList = document.querySelectorAll('.effects__preview');
  window.imgUploadPreview = document.querySelector('.img-upload__preview');
  var list = document.querySelector('.effects__list');

  var removeEffectClass = function () {
    for (var i = 0; i < window.imgEffectsList.length; i++) {
      window.imgUploadPreview.classList.remove(window.imgEffectsList[i].classList[1]);
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
