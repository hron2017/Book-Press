//====================  SCROLL ========================//
$(window).scroll(function (event) {
	var scr = $(this).scrollTop();
	sectors(scr);
});
function sectors(scr) {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	if (scr > 130) {
		$('.middle').addClass('scroll');
	} else {
		$('.middle').removeClass('scroll');
	}
}
//====================  <!-- SCROLL --> ========================//
//====================  UP ========================//
$(window).scroll(function () {
	var w = $(window).width();
	if ($(window).scrollTop() > 50) {
		$('#up').fadeIn(300);
	} else {
		$('#up').fadeOut(300);
	}
});
$('#up').click(function (event) {
	$('body,html').animate({ scrollTop: 0 }, 300);
});
//==================== <!-- UP --> ========================//
//====================  ImageBg ========================//
function ibg() {
	function isIE() {
		let ibg = document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();
//====================  <!-- ImageBg -->  ========================//

//====================   GoTO -->  ========================//
$('.goto').click(function () {
	var el = $(this).attr('href').replace('#', '');

	var offset = 0;
	$('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

	if ($('.header-menu__mobile').hasClass('active')) {
		$('.header-menu__mobile,.header-menu__icon').removeClass('active');
		$('body').removeClass('lock');
	}
	return false;
});
//====================  <!-- GoTO -->  ========================//
//====================  Video  ========================//
$('.video-play').click(function () {
	$('#video').get(0).play();
	$(this).fadeOut();
	$('.video__poster').fadeOut();
});
//====================  <!-- Video -->  ========================//
//====================  Price-counter  ========================//
const counters = document.querySelectorAll('.price-content__price-count');
const speed = 130; // The lower the slower

counters.forEach(counter => {
	const updateCount = () => {
		const target = +counter.getAttribute('data-target');
		const count = + Math.round(counter.innerText);
		const inc = Math.round(target / speed);
		if (count < target) {
			counter.innerText = count + inc;
			setTimeout(updateCount, 10);
		} else {
			counter.innerText = target;
		}
	};
	updateCount();
});
//==================== <!-- Price-counter --> ========================//


$('.main-slider__body').slick({
	infinite: false,
	arrows: true,
	dots: true,
	appendArrows: '.main-slider__control',
	nextArrow: '.main-slider__control-arrow-next',
	prevArrow: '.main-slider__control-arrow-prev',
});

$('.articles-slider__body').slick({
	infinite: false,
	arrows: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	nextArrow: '.articles-slider__control-arrow-next',
	prevArrow: '.articles-slider__control-arrow-prev',
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			}
		},

		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});




//==================== <-- Footer-link-active --> ========================//

$('.footer-menu__link').click(function (e) {
	e.preventdefault;
	$('.footer-menu__link').removeClass('active');
	$(this).addClass('active');
});

//==================== <-- Footer-link-active --> ========================//

//==================== <-- Favorite --> ========================//

$('.item-cards__favotite').click(function () {
	$(this).toggleClass('item-cards__favorite-add');
})

//==================== <-- Favorite --> ========================//
