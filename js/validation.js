'use strict';

(function () {
  // validation hashtag - start

  var hashtagInput = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var MAX_COUNT_HASHTAG = 5;
  var MAX_LENGTH_HASHTAG = 20;

  hashtagInput.addEventListener('input', function () {
    var hashtag = hashtagInput.value.trim();
    hashtag = hashtag.split(' ');

    if (hashtag.length > MAX_COUNT_HASHTAG) {
      hashtagInput.setCustomValidity('Слишком много хеш-тегов!');
    } else {
      hashtagInput.setCustomValidity('');
    }

    for (var i = 0; i < hashtag.length; i++) {
      if (hashtag[i].indexOf('#') !== 0) {
        hashtagInput.setCustomValidity('Хеш-тег должен начинаться с #!');
      } else if (hashtag[i].length > MAX_LENGTH_HASHTAG) {
        hashtagInput.setCustomValidity('Слишком длинный хеш-тег!');
      } else if (hashtag[i].slice(1).indexOf('#') > 0) {
        hashtagInput.setCustomValidity('Хештеги должны быть отделены друг от друга пробелами!');
      } else if (hashtag[i].length <= 1) {
        hashtagInput.setCustomValidity('Хештеги не могут состоять из одной #!');
      }

      for (var j = 0; j < i; j++) {
        if (hashtag[j].toLowerCase() === hashtag[i].toLowerCase()) {
          hashtagInput.setCustomValidity('Такой хеш-тег уже есть!');
        }
      }
    }
  });

  hashtagInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.pressEscClose);
  });

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.pressEscClose);
  });

  hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.pressEscClose);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', window.pressEscClose);
  });

  // validation hashtag - end
})();
