'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.error = function (message) {
    throw new Error(message);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ошибки ' + xhr.status);
        }
      });

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
