$('body').on('click', '.bottom__line-item', function (event) {
	var eq = $(this).index(),
		val = $(this).text();

	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.page-home').find('.bottom__line-item').removeClass('active');
		$(this).closest('.page-home').find('.block-head__heading').text(val);
		$(this).addClass('active');
		$(this).closest('.page-home').find('.catalog-box__main').removeClass('active').eq(eq).addClass('active');
	}
});

$('body').on('click', '.tab__navitem', function (event) {
	var eq = $(this).index();
	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});