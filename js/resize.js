'use strict';

(function () {
  // resize img - start

  var resizeControlMinus = document.querySelector('.scale__control--smaller');
  var resizeControlPlus = document.querySelector('.scale__control--bigger');
  var resizeControlValue = document.querySelector('.scale__control--value');
  var summ = 100;
  var reducePhoto = function () {
    summ -= 25;

    if (summ < 25) {
      summ = 25;
    }

    resizeControlValue.value = summ + '%';
    window.imgUploadPreview.style.transform = 'scale(' + (summ / 100) + ')';
  };

  var increasePhoto = function () {
    summ += 25;

    if (summ > 100) {
      summ = 100;
    }
    resizeControlValue.value = summ + '%';
    window.imgUploadPreview.style.transform = 'scale(' + (summ / 100) + ')';
  };

  resizeControlMinus.addEventListener('click', function () {
    reducePhoto();
  });

  resizeControlPlus.addEventListener('click', function () {
    increasePhoto();
  });

// resize img - end
})();
