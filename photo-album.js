const photos = document.querySelectorAll('.photo__content');
const fullPhoto = document.querySelector('.photo__full');
const fullPhotoContent = fullPhoto.querySelector('.photo__full-content');
const close = fullPhoto.querySelector('.photo__control_cross');
const left = fullPhoto.querySelector('.photo__control_left');
const right = fullPhoto.querySelector('.photo__control_right');

const keyCodes = {
  ENTER: 13,
  ESC: 27
}

let currentPhoto = null;
let photosSource = [];

function setClassVisible(element, isVisible) {
  element.classList.toggle('hidden', !isVisible);
}

function setPhoto(element, src) {
  element.querySelector('img').src = src;
}

function getCurrentPhotoIndex() {
  return photosSource.indexOf(fullPhotoContent.querySelector('img').src);
}

function onKeydownClick(evt) {
  if (evt.keyCode === keyCodes.ENTER) {
    switch (evt.target) {
      case close:
        onCloseClick();
        break;
      case left:
        onLeftClick();
        break;
      case right:
        onRightClick();
        break;
    }
  } else if (evt.keyCode === keyCodes.ESC) {
    onCloseClick();
  }
}

function onPhotoClick(evt) {
  currentPhoto = evt.target.src;
  photosSource = [...photos].map(photo => photo.src);

  setPhoto(fullPhotoContent, currentPhoto);
  setClassVisible(fullPhoto, true);

  document.addEventListener('keydown', onKeydownClick);

  close.addEventListener('click', onCloseClick);
  left.addEventListener('click', onLeftClick);
  right.addEventListener('click', onRightClick);
  fullPhoto.addEventListener('click', function (evt) {
    if (evt.target === fullPhoto) {
      onCloseClick();
    }
  }, true);
}

function onCloseClick() {
  setClassVisible(fullPhoto, false);

  document.removeEventListener('keydown', onKeydownClick);

  close.removeEventListener('click', onCloseClick);
  left.removeEventListener('click', onLeftClick);
  right.removeEventListener('click', onRightClick);
}

function onLeftClick() {
  const currentIndex = getCurrentPhotoIndex();
  const index = currentIndex === 0 ? photosSource.length - 1 : currentIndex - 1;
  setPhoto(fullPhotoContent, photosSource[index]);
}

function onRightClick() {
  const currentIndex = getCurrentPhotoIndex();
  const index = currentIndex === photosSource.length - 1 ? 0 : currentIndex + 1;
  setPhoto(fullPhotoContent, photosSource[index]);
}

if (window.innerWidth >= 768) {
  photos.forEach(photo => photo.addEventListener('click', onPhotoClick));
}
