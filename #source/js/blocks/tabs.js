$('body').on('click', '.bottom__line-item', function (event) {
	var eq = $(this).index(),
		val = $(this).text();

	console.log(val);

	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.page-home').find('.bottom__line-item').removeClass('active');
		$(this).closest('.page-home').find('.block-head__heading').text(val);
		$(this).addClass('active');
		$(this).closest('.page-home').find('.catalog-box__main').removeClass('active').eq(eq).addClass('active');
		$(this).closest('.page-home').find('.delivery__item').removeClass('active').eq(eq).addClass('active');
		$(this).closest('.page-home').find('.delivery-description__item').removeClass('active').eq(eq).addClass('active');
	}
});

