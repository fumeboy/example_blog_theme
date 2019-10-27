/**
 * Utils
 */

// Throttle
//
const throttle = (callback, limit) => {
  let timeoutHandler = null;
  return () => {
    if (timeoutHandler == null) {
      timeoutHandler = setTimeout(() => {
        callback();
        timeoutHandler = null;
      }, limit);
    }
  };
};

// addEventListener Helper
//
const listen = (ele, e, callback) => {
  if (document.querySelector(ele) !== null) {
    document.querySelector(ele).addEventListener(e, callback);
  }
}

/**
 * Functions
 */

// Auto Hide Header
//
let header = document.getElementById('site-header');
let lastScrollPosition = window.pageYOffset;

const autoHideHeader = () => {
  let currentScrollPosition = Math.max(window.pageYOffset, 0);
  if (currentScrollPosition > lastScrollPosition) {
    header.classList.remove('slideInUp');
    header.classList.add('slideOutDown');
  } else {
    header.classList.remove('slideOutDown');
    header.classList.add('slideInUp');
  }
  lastScrollPosition = currentScrollPosition;
}

// Mobile Menu Toggle
//
let mobileMenuVisible = false;

const toggleMobileMenu = () => {
  let mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuVisible == false) {
    mobileMenu.style.display = 'flex';
    mobileMenuVisible = true;
  } else {
    mobileMenu.style.display = 'none';
    mobileMenuVisible = false;
  }
}

if (header !== null) {
  listen('#menu-btn', "click", toggleMobileMenu);

  document.querySelectorAll('.post-year').forEach((ele)=> {
    ele.addEventListener('click', () => {
      window.location.hash = '#' + ele.id;
    });
  });

  window.addEventListener('scroll', throttle(() => {
    autoHideHeader();

    if (mobileMenuVisible == true) {
      toggleMobileMenu();
    }
  }, 250));
}


let imgs = document.querySelectorAll('img');



//用来判断bound.top<=clientHeight的函数，返回一个bool值
function isIn(el) {
  let bound = el.getBoundingClientRect();
  let clientHeight = window.innerHeight;
  return bound.top <= clientHeight;
}
//检查图片是否在可视区内，如果不在，则加载
function check() {
  Array.from(imgs).forEach(function(el){
    if(isIn(el)){
      loadImg(el);
    }
  })
}
function loadImg(el) {
  if(!el.src){
    el.src = el.dataset.src;
  }
}
window.onload = window.onscroll = function () { //onscroll()在滚动条滚动的时候触发
  check();
};
