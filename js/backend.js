'use strict';

(function () {

  window.error = function (message) {
    throw new Error(message);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ошибки ' + xhr.status);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Статус ошибки: ' + xhr.status);
      });

      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onSuccess, onError, errorPopup) {
      var URL = 'https://js.dump.academy/kekstagram';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          errorPopup();
          window.imgUploadOverlay.classList.add('hidden');
          window.uploadFile.value = '';
          onError('Что то пошло не так:' + xhr.status);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Статус ошибки: ' + xhr.statusText);
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
