'use strict';

(function () {
  // show bigPhoto - start

  var pictures = document.querySelector('.pictures');
  var bigPhotoCancel = document.querySelector('#picture-cancel');
  var targets = [];
  var openBigPicture = function () {
    window.bigPicture.classList.remove('hidden');

    document.addEventListener('keydown', bigPictureEscClose);
  };

  var closeBigPicture = function () {
    window.bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', bigPictureEscClose);
  };

  var bigPictureEscClose = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  pictures.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList[0] !== 'picture__img') {
      return;
    }

    for (var i = 0; i < window.photos.length; i++) {
      targets[i] = {url: target.src};
    }

    for (i = 0; i < window.photos.length; i++) {
      if (targets[0].url.slice(22) === window.photos[i].url) {
        window.renderBigPhoto(window.photos[i]);
      }
    }

    openBigPicture();
  });

  bigPhotoCancel.addEventListener('click', function () {
    closeBigPicture();
  });

  // show bigPhoto - end
})();
