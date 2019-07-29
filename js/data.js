'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var bigPhotoCancel = document.querySelector('#picture-cancel');
  var commentsList = document.querySelector('.social__comments');
  window.photos = [];
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

  bigPhotoCancel.addEventListener('click', function () {
    closeBigPicture();
  });

  var removePhotos = function () {
    var photos = document.querySelectorAll('.picture');

    photos.forEach(function (it) {
      pictures.removeChild(it);
    });
  };

  window.render = function (photoE) {
    removePhotos();
    var template = document.querySelector('#picture').content.querySelector('.picture');
    var picturesList = document.querySelector('.pictures');

    var renderPhoto = function (photoEl) {
      var photoElement = template.cloneNode(true);

      photoElement.querySelector('.picture__img').src = photoEl.url;
      photoElement.querySelector('.picture__comments').textContent = photoEl.comments.length;
      photoElement.querySelector('.picture__likes').textContent = photoEl.likes;

      return photoElement;
    };

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photoE.length; i++) {
      fragment.appendChild(renderPhoto(photoE[i]));
    }

    picturesList.appendChild(fragment);
  };

  window.updateNewPhotos = function () {
    window.newPhotos = window.photos.slice();

    for (var i = 0; i < window.newPhotos.length; i++) {
      window.change(window.getRandom(0, window.newPhotos.length - 1), window.getRandom(0, window.newPhotos.length - 1), window.newPhotos);
    }

    window.newPhotos.splice(12);

    window.render(window.newPhotos);
  };

  window.updateInterestingPhotos = function () {
    window.interestingPhotos = window.photos.slice();

    window.interestingPhotos.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });

    window.render(window.interestingPhotos);
  };

  var onSuccess = function (photo) {
    window.photos = photo;
    window.render(window.photos);
    showBP(window.photos);
  };

  window.renderBigPhoto = function (bigPhoto) {
    window.bigPicture = document.querySelector('.big-picture');
    window.bigPicture.querySelector('.big-picture__img > img').src = bigPhoto.url;
    window.bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
    window.bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
    window.bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
  };

  var renderComment = function (commentBP) {
    var templateBP = document.querySelector('#comment').content.querySelector('.social__comment');
    var BPElement = templateBP.cloneNode(true);

    commentsList.innerHTML = '';

    BPElement.querySelector('.social__picture').src = commentBP.avatar;
    BPElement.querySelector('.social__text').textContent = commentBP.message;

    return BPElement;
  };

  var BPFragment = document.createDocumentFragment();
  var commentListBP = document.querySelector('.social__comments');

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comments-loader').classList.add('visually-hidden');

  var showBP = function (photo) {
    pictures.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList[0] !== 'picture__img') {
        return;
      }

      for (var i = 0; i < photo.length; i++) {
        if (target.src.slice(22) === photo[i].url) {
          window.renderBigPhoto(photo[i]);
          for (var j = 0; j < photo[i].comments.length; j++) {
            BPFragment.appendChild(renderComment(photo[i].comments[j]));
          }
        }
      }

      commentListBP.appendChild(BPFragment);

      openBigPicture();
    });
  };

  window.backend.load(onSuccess, window.error);
})();


