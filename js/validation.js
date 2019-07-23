'use strict';

(function () {
  // validation hashtag - start

  window.hashtagInput = document.querySelector('.text__hashtags');
  window.textDescription = document.querySelector('.text__description');
  var MAX_COUNT_HASHTAG = 5;
  var MAX_LENGTH_HASHTAG = 20;

  window.hashtagInput.addEventListener('input', function () {
    var hashtag = window.hashtagInput.value.trim();
    hashtag = hashtag.split(' ');

    if (hashtag.length > MAX_COUNT_HASHTAG) {
      window.hashtagInput.setCustomValidity('Слишком много хеш-тегов!');
    } else {
      window.hashtagInput.setCustomValidity('');
    }

    for (var i = 0; i < hashtag.length; i++) {
      if (hashtag[i].indexOf('#') !== 0) {
        window.hashtagInput.setCustomValidity('Хеш-тег должен начинаться с #!');
      } else if (hashtag[i].length > MAX_LENGTH_HASHTAG) {
        window.hashtagInput.setCustomValidity('Слишком длинный хеш-тег!');
      } else if (hashtag[i].slice(1).indexOf('#') > 0) {
        window.hashtagInput.setCustomValidity('Хештеги должны быть отделены друг от друга пробелами!');
      } else if (hashtag[i].length <= 1) {
        window.hashtagInput.setCustomValidity('Хештеги не могут состоять из одной #!');
      }

      for (var j = 0; j < i; j++) {
        if (hashtag[j].toLowerCase() === hashtag[i].toLowerCase()) {
          window.hashtagInput.setCustomValidity('Такой хеш-тег уже есть!');
        }
      }
    }
  });

  window.hashtagInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.pressEscClose);
  });

  window.textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.pressEscClose);
  });

  window.hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.pressEscClose);
  });

  window.textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', window.pressEscClose);
  });

  // validation hashtag - end
})();
