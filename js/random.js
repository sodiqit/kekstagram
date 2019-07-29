'use strict';

(function () {
  window.change = function (x, y, name) {
    var a = name[x];

    name[x] = name[y];
    name[y] = a;
  };

  window.getRandom = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };
})();
