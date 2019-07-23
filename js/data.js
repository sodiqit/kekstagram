'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var bigPhotoCancel = document.querySelector('#picture-cancel');
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

    var commentsList = document.querySelector('.social__comments');
    var comments = document.querySelectorAll('.social__comment');

    for (var i = 0; i < comments.length; i++) {
      commentsList.removeChild(comments[i]);
    }

  });

  window.backend.load(function (photo) {
    // create fragment - start

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

    for (var i = 0; i < photo.length; i++) {
      fragment.appendChild(renderPhoto(photo[i]));
    }

    picturesList.appendChild(fragment);

    // create fragment - end

    // add comments - start

    window.bigPicture = document.querySelector('.big-picture');

    window.renderBigPhoto = function (bigPhoto) {
      window.bigPicture.querySelector('.big-picture__img > img').src = bigPhoto.url;
      window.bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
      window.bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
      window.bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
    };

    var renderComment = function (commentBP) {
      var templateBP = document.querySelector('#comment').content.querySelector('.social__comment');
      var BPElement = templateBP.cloneNode(true);

      BPElement.querySelector('.social__picture').src = commentBP.avatar;
      BPElement.querySelector('.social__text').textContent = commentBP.message;

      return BPElement;
    };

    var BPFragment = document.createDocumentFragment();
    var commentListBP = document.querySelector('.social__comments');

    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.social__comments-loader').classList.add('visually-hidden');

    // add comments - end

    // show bigPhoto - start

    pictures.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList[0] !== 'picture__img') {
        return;
      }

      for (i = 0; i < photo.length; i++) {
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

    // show bigPhoto - end
  }, window.error);


})();


