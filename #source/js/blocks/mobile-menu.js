//Adaptive functions
//====================  Mobile Menu ========================//
$('.header-menu__icon').click(function (event) {
	$(this).toggleClass('active');


	$('.sitebar').toggleClass('active');
});


$(window).resize(function (event) {
	adaptive_function();
});
function adaptive_header(w, h) {
	var logo = $('.header__logo');
	var headerLogin = $('.header-middle__login');
	var headerMenuNav = $('.header-menu__nav');
	var headerMenuMobile = $('.header-menu__mobile');
	if (w < 986) {
		if (!headerMenuNav.hasClass('done')) {
			headerMenuNav.addClass('done').appendTo(headerMenuMobile);
		}
	} else {
		if (headerMenuNav.hasClass('done')) {
			headerMenuNav.removeClass('done').appendTo(headerMenu);
		}
	}

	if (w < 1200) {


		logo.html('<img src="img/logo-mobile.png" alt="" />');



		if (!$('body').hasClass('done')) {
			$('body').addClass('done').append($('<div class="page-home-scroll"></div>'));
		}


	} else {
		logo.html('<img src="img/logo.png" alt="" />');



		if ($('body').hasClass('done')) {
			$('body').removeClass('done');
			$("div.page-home-scroll").remove();
		}

	}
	/*
		if (w < 600) {
			$('.present__bg').html('<img src="img/present/present-bg-mobile.jpg" alt="" />');
		} else {
			$('.present__bg').html('<img src="img/present/present-bg.jpg" alt="" />')
		}
	*/
}
function adaptive_function() {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	adaptive_header(w, h);
}
adaptive_function();