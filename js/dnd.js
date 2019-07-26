'use strict';

(function () {
  // add drag and drop effect - start

  var levelValue = document.querySelector('.effect-level__value');
  var levelLine = document.querySelector('.effect-level__line');
  window.levelPin = document.querySelector('.effect-level__pin');
  window.levelDepth = document.querySelector('.effect-level__depth');
  // TODO: Refarctoring this shit!!!
  window.checkEffect = function (effect, numberEffect) {
    switch (effect) {
      case 'effects__preview--chrome':
        window.imgUploadPreview.style.filter = 'grayscale(' + (numberEffect / 453) + ')';
        break;
      case 'effects__preview--sepia':
        window.imgUploadPreview.style.filter = 'sepia(' + (numberEffect / 453) + ')';
        break;
      case 'effects__preview--marvin':
        window.imgUploadPreview.style.filter = 'invert(' + (numberEffect / 453 * 100) + '%' + ')';
        break;
      case 'effects__preview--phobos':
        window.imgUploadPreview.style.filter = 'blur(' + ((numberEffect / 453) * 3) + 'px' + ')';
        break;
      case 'effects__preview--heat':
        window.imgUploadPreview.style.filter = 'brightness(' + ((numberEffect / 453 + 1) * 1.5) + ')';
        break;
      case 'effects__preview--none':
        window.imgUploadPreview.style.filter = '';
        break;
    }
  };

  var onLevelLineDown = function (evt) {
    evt.preventDefault();

    var positionPin = window.levelPin.getBoundingClientRect();

    var startCoords = {
      x: evt.clientX
    };

    var shift = {
      x: startCoords.x - positionPin.x
    };

    window.levelPin.style.left = (window.levelPin.offsetLeft + shift.x - 9) + 'px';
    window.levelDepth.style.width = window.levelPin.style.left;
    levelValue.value = Math.floor(window.levelPin.offsetLeft / 453 * 100);

    window.checkEffect(window.imgUploadPreview.classList[1], window.levelPin.offsetLeft);

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onLevelLineDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  };

  levelLine.addEventListener('mousedown', onLevelLineDown);

  window.levelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var newCoords = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.levelPin.style.left = (window.levelPin.offsetLeft - newCoords.x) + 'px';
      window.levelDepth.style.width = window.levelPin.style.left;
      levelValue.value = Math.floor(window.levelPin.offsetLeft / 453 * 100);

      window.checkEffect(window.imgUploadPreview.classList[1], window.levelPin.offsetLeft);

      if (window.levelPin.offsetLeft <= 0) {
        window.levelPin.style.left = 0;
        window.levelDepth.style.width = 0;
      } else if (window.levelPin.offsetLeft >= 453) {
        window.levelPin.style.left = 453 + 'px';
        window.levelDepth.style.width = 453 + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

// add drag and drop effect - end
})();
