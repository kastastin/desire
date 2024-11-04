$(function () {
  // right menu (>768px)
  $(".header__button").on("click", function () {
    $(".rightside-menu").removeClass("rightside-menu--close");
  });

  $(".rightside-menu__close").on("click", function () {
    $(".rightside-menu").addClass("rightside-menu--close");
  });

  // menu (<540px)
  $(".header__button-menu").on("click", function () {
    $(".menu").toggleClass("menu--open");
  });

  $(".top__slider").slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
  });

  $(".contact-slider").slick({
    slidesToShow: 10,
    slidesToScroll: 10,
    dots: true,
    arrows: false,
  });

  $(".article-slider__box").slick({
    prevArrow:
      '<button type="button" class="article-slider__arrow article-slider__arrow-left"><img src="images/arrow-slide-left.svg" alt="left arrow"></button>',
    nextArrow:
      '<button type="button" class="article-slider__arrow article-slider__arrow-right"><img src="images/arrow-slide-right.svg" alt="right arrow"></button>',
  });

  if ($(".gallery__inner").length) {
    const mixer = mixitup(".gallery__inner", {
      load: {
        filter: ".living",
      },
    });
  }
});
