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
bigPicture.classList.remove('hidden');

var renderBigPhoto = function (bigPhoto) {
  bigPicture.querySelector('.big-picture__img > img').src = bigPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPhoto.comment.length;
  bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
};

renderBigPhoto(photos[0]);

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
