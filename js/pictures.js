'use strict';
// create objects - start
var photos = [];

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

var descriptions = [
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!',
  'Тестим новую камеру!'
];

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var createComment = function (number) {
  var commentList = [];

  for (var i = 0; i < number; i++) {
    commentList[i] = comments[getRandom(0, comments.length - 1)];
  }

  return commentList;
};

var createObj = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(15, 120),
      comment: createComment(getRandom(1, 2)),
      description: descriptions[getRandom(0, descriptions.length - 1)]
    };
  }
};

createObj(25);
// create objects - end

// create fragment - start
var template = document.querySelector('#picture').content.querySelector('.picture');
var picturesList = document.querySelector('.pictures');

var renderPhoto = function (photo) {
  var photoElement = template.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comment.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}

picturesList.appendChild(fragment);

// create fragment - end

// add comments - start

var bigPicture = document.querySelector('.big-picture');

var renderBigPhoto = function (bigPhoto) {
  bigPicture.querySelector('.big-picture__img > img').src = bigPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPhoto.comment.length;
  bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
};

// TODO:
// renderBigPhoto(photos[0]);

var renderComment = function (commentBP) {
  var templateBP = document.querySelector('.social__comment');
  var BPElement = templateBP.cloneNode(true);

  BPElement.querySelector('.social__picture').src = 'img/avatar-' + getRandom(1, 6) + '.svg';
  BPElement.querySelector('.social__text').textContent = commentBP;

  return BPElement;
};

var BPFragment = document.createDocumentFragment();
var commentListBP = document.querySelector('.social__comments');

for (var j = 0; j < photos[0].comment.length; j++) {
  BPFragment.appendChild(renderComment(photos[0].comment[j]));
}

commentListBP.appendChild(BPFragment);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comments-loader').classList.add('visually-hidden');

// add comment - end

// show editor img - start

var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var closeUploadOverlay = imgUploadOverlay.querySelector('.img-upload__cancel');
var ESC_KEYCODE = 27;

var openimgOverlay = function () {
  imgUploadOverlay.classList.remove('hidden');

  document.addEventListener('keydown', pressEscClose);
};

var closeImgOverlay = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', pressEscClose);

  removeEffectClass();

  uploadFile.value = '';
};

var pressEscClose = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeImgOverlay();
  }
};

uploadFile.addEventListener('change', function () {
  openimgOverlay();
});

closeUploadOverlay.addEventListener('click', function () {
  closeImgOverlay();
});

// show editor img - end

// add effects on img - start

var imgEffectsList = document.querySelectorAll('.effects__preview');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var list = document.querySelector('.effects__list');

var removeEffectClass = function () {
  for (i = 0; i < imgEffectsList.length; i++) {
    imgUploadPreview.classList.remove(imgEffectsList[i].classList[1]);
  }
};

list.addEventListener('click', function (evt) {
  var target = evt.target;
  var value = target.classList[1];

  imgUploadPreview.classList.add(value);
  imgUploadPreview.classList.remove('visually-hidden');

  if (imgUploadPreview.classList.length > 2) {
    removeEffectClass();
    imgUploadPreview.classList.add(value);
  }
});

// add effects on img - end

// add drag and drop effect - start

// TODO: create drag'n'drop

// add drag and drop effect - end

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
  imgUploadPreview.style.transform = 'scale(' + (summ / 100) + ')';
};

var increasePhoto = function () {
  summ += 25;

  if (summ > 100) {
    summ = 100;
  }
  resizeControlValue.value = summ + '%';
  imgUploadPreview.style.transform = 'scale(' + (summ / 100) + ')';
};

resizeControlMinus.addEventListener('click', function () {
  reducePhoto();
});

resizeControlPlus.addEventListener('click', function () {
  increasePhoto();
});

// resize img - end

// show bigPhoto - start

var pictures = document.querySelector('.pictures');
var bigPhotoCancel = document.querySelector('#picture-cancel');
var targets = [];
var openBigPicture = function () {
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', bigPictureEscClose);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', bigPictureEscClose);
};

var bigPictureEscClose = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

pictures.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList[0] !== 'picture__img') {
    return;
  }

  for (i = 0; i < photos.length; i++) {
    targets[i] = {url: target.src};
  }

  for (i = 0; i < photos.length; i++) {
    if (targets[0].url.slice(22, 38) === photos[i].url) {
      renderBigPhoto(photos[i]);
    }
  }

  openBigPicture();
});

bigPhotoCancel.addEventListener('click', function () {
  closeBigPicture();
});

// show bigPhoto - end

