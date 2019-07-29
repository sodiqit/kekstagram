'use strict';

(function () {
  window.debounce = function (fun) {
    var lastTimeout;

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    } else {
      lastTimeout = setTimeout(fun, 500);
    }
  };
})();
