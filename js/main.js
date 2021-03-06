//@prepros-append jq-start.js

//@prepros-append blocks/mobile-menu.js
//@prepros-append blocks/popup.js
//@prepros-append blocks/spoller.js
//@prepros-append blocks/forms.js
//@prepros-append blocks/tabs.js
//@prepros-append blocks/rating.js
//@prepros-append blocks/check.js
//@prepros-append blocks/select.js
//@prepros-append blocks/dynamic_adapt.js

//@prepros-append script.js

//@prepros-append jq-end.js



$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
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



		if (!$('.header').hasClass('done')) {

		}


	} else {
		logo.html('<img src="img/logo.png" alt="" />');



		if ($('.header').hasClass('done')) {
			$('.header').removeClass('done');

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
//POPUP
$('.pl').click(function(event) {
		var pl=$(this).attr('href').replace('#','');
		var v=$(this).data('vid');
	popupOpen(pl,v);
	return false;
});
function popupOpen(pl,v){
	$('.popup').removeClass('active').hide();
	if(!$('.header-menu').hasClass('active')){
		$('body').data('scroll',$(window).scrollTop());
	}
	if(!isMobile.any()){
		$('body').css({paddingRight:$(window).outerWidth()-$('.wrapper').outerWidth()}).addClass('lock');
		$('.pdb').css({paddingRight:$(window).outerWidth()-$('.wrapper').outerWidth()});
	}else{
		setTimeout(function() {
			$('body').addClass('lock');
		},300);
	}
	history.pushState('', '', '#'+pl);
	if(v!='' && v!=null){
		$('.popup-'+pl+' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/'+v+'?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-'+pl).fadeIn(300).delay(300).addClass('active');

	if($('.popup-'+pl).find('.slick-slider').length>0){
		$('.popup-'+pl).find('.slick-slider').slick('setPosition');
	}
}
function openPopupById(popup_id){
	$('#'+popup_id).fadeIn(300).delay(300).addClass('active');
}
function popupClose(){
	$('.popup').removeClass('active').fadeOut(300);
	if(!$('.header-menu').hasClass('active')){
		if(!isMobile.any()){
			setTimeout(function() {
				$('body').css({paddingRight:0});
				$('.pdb').css({paddingRight:0});
			},200);
			setTimeout(function() {
				$('body').removeClass('lock');
				$('body,html').scrollTop(parseInt($('body').data('scroll')));
			},200);
		}else{
			$('body').removeClass('lock');
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}
$('.popup-close,.popup__close').click(function(event) {
	popupClose();
	return false;
});
$('.popup').click(function(e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});
$(document).on('keydown',function(e) {
	if(e.which==27){
		popupClose();
	}
});
$.each($('.spoller.active'), function (index, val) {
	$(this).next().show();
});
$('body').on('click', '.spoller', function (event) {
	if ($(this).hasClass('mob') && !isMobile.any()) {
		return false;
	}
	if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
		$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
			$(this).removeClass('active');
			$(this).next().slideUp(300);
		});
	}
	$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
		if ($(this).parent().find('.slick-slider').length > 0) {
			$(this).parent().find('.slick-slider').slick('setPosition');
		}
	});
	return false;
});

$.each($('.order-spoller.active'), function (index, val) {
	$(this).closest('.personal-order').find('.order-spoller__content').show();
});
$('body').on('click', '.order-spoller', function (event) {
	if ($(this).hasClass('mob') && !isMobile.any()) {
		return false;
	}
	if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
		$.each($(this).closest('.spollers').find('.order-spoller'), function (index, val) {
			$(this).removeClass('active');
			$(this).closest('.personal-order').find('.order-spoller__content').slideUp(300);
		});
	}
	$(this).toggleClass('active').closest('.personal-order').find('.order-spoller__content').slideToggle(300, function (index, val) {

	});
	return false;
});
//FORMS
function forms() {
	//SELECT

	//FIELDS
	$('input,textarea').focus(function () {
		if ($(this).val() == $(this).attr('data-value')) {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).attr('data-type') == 'pass') {
				$(this).attr('type', 'password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function () {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			this.value = $(this).attr('data-value');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}
		if (this.value != $(this).attr('data-value') && this.value != '') {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}

		$(this).click(function () {
			if (this.value == $(this).attr('data-value')) {
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'password');
				};
				this.value = '';
			};
		});
		$(this).blur(function () {
			if (this.value == '') {
				this.value = $(this).attr('data-value');
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'text');
				};
			};
		});
	});
	$('.form-input__viewpass').click(function (event) {
		if ($(this).hasClass('active')) {
			$(this).parent().find('input').attr('type', 'password');
		} else {
			$(this).parent().find('input').attr('type', 'text');
		}
		$(this).toggleClass('active');
	});

	//$('textarea').autogrow({vertical: true, horizontal: false});


	//MASKS//
	//'+7(999) 999 9999'
	//'+38(999) 999 9999'
	//'+375(99)999-99-99'
	//'a{3,1000}' только буквы минимум 3
	//'9{3,1000}' только цифры минимум 3
	$.each($('input.phone'), function (index, val) {
		$(this).attr('type', 'tel');
		$(this).focus(function () {
			$(this).inputmask('+38(999) 999 9999', {
				clearIncomplete: true, clearMaskOnLostFocus: true,
				"onincomplete": function () { maskclear($(this)); }
			});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.phone').focusout(function (event) {
		maskclear($(this));
	});
	$.each($('input.num'), function (index, val) {
		$(this).focus(function () {
			$(this).inputmask('9{1,1000}', { clearIncomplete: true, placeholder: "", clearMaskOnLostFocus: true, "onincomplete": function () { maskclear($(this)); } });
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.num').focusout(function (event) {
		maskclear($(this));
	});

	//ADDFILES
	$('.form-addfile__input').change(function (e) {
		if ($(this).val() != '') {
			var ts = $(this);
			ts.parents('.form-addfile').find('ul.form-addfile-list').html('');
			$.each(e.target.files, function (index, val) {
				if (ts.parents('.form-addfile').find('ul.form-addfile-list>li:contains("' + e.target.files[index].name + '")').length == 0) {
					ts.parents('.form-addfile').find('ul.form-addfile-list').append('<li>' + e.target.files[index].name + '</li>');
				}
			});
		}
	});
}
forms();

function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return r;
}

//VALIDATE FORMS
$('form button[type=submit]').click(function () {
	var er = 0;
	var form = $(this).parents('form');
	var ms = form.data('ms');
	$.each(form.find('.req'), function (index, val) {
		er += formValidate($(this));
	});
	if (er == 0) {
		removeFormError(form);
		/*
			var messagehtml='';
		if(form.hasClass('editprofile')){
			var messagehtml='';
		}
		formLoad();
		*/

		//ОПТРАВКА ФОРМЫ
		/*
		function showResponse(html){
			if(!form.hasClass('nomessage')){
				showMessage(messagehtml);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		}
		var options={
			success:showResponse
		};
			form.ajaxForm(options);
		

		setTimeout(function(){
			if(!form.hasClass('nomessage')){
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		},0);

		return false;
		*/

		if (ms != null && ms != '') {
			showMessageByClass(ms);
			return false;
		}
	} else {
		return false;
	}
});
function formValidate(input) {
	var er = 0;
	var form = input.parents('form');
	if (input.attr('name') == 'email' || input.hasClass('email')) {
		if (input.val() != input.attr('data-value')) {
			var em = input.val().replace(" ", "");
			input.val(em);
		}
		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	} else {
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	}
	if (input.attr('type') == 'checkbox') {
		if (input.prop('checked') == true) {
			input.removeClass('err').parent().removeClass('err');
		} else {
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if (input.hasClass('name')) {
		if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
			er++;
			addError(input);
		}
	}
	if (input.hasClass('pass-2')) {
		if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
			addError(input);
		} else {
			removeError(input);
		}
	}
	return er;
}
function formLoad() {
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms) {
	$('.popup').hide();
	popupOpen('message.' + ms, '');
}
function showMessage(html) {
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form) {
	$.each(form.find('.input'), function (index, val) {
		$(this).removeClass('focus').val($(this).data('value'));
		$(this).parent().removeClass('focus');
		if ($(this).hasClass('phone')) {
			maskclear($(this));
		}
	});
}
function addError(input) {
	input.addClass('err');
	input.parent().addClass('err');
	input.parent().find('.form__error').remove();
	if (input.hasClass('email')) {
		var error = '';
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			error = input.data('error');
		} else {
			error = input.data('error');
		}
		if (error != null) {
			input.parent().append('<div class="form__error">' + error + '</div>');
		}
	} else {
		if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
			input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
		}
	}
	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function addErrorByName(form, input__name, error_text) {
	var input = form.find('[name="' + input__name + '"]');
	input.attr('data-error', error_text);
	addError(input);
}
function addFormError(form, error_text) {
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form) {
	form.find('.form__generalerror').hide().html('');
}
function removeError(input) {
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form) {
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}
function maskclear(n) {
	if (n.val() == "") {
		n.inputmask('remove');
		n.val(n.attr('data-value'));
		n.removeClass('focus');
		n.parent().removeClass('focus');
	}
}
function searchselectreset() {
	$.each($('.select[data-type="search"]'), function (index, val) {
		var block = $(this).parent();
		var select = $(this).parent().find('select');
		if ($(this).find('.select-options__value:visible').length == 1) {
			$(this).addClass('focus');
			$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
			$(this).find('.select-title__value').val($('.select-options__value:visible').html());
			$(this).find('.select-title__value').attr('data-value', $('.select-options__value:visible').html());
		} else if (select.val() == '') {
			$(this).removeClass('focus');
			block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
			block.find('input.select-title__value').attr('data-value', select.find('option[selected="selected"]').html());
		}
	});
}


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
//RATING
$('.rating.edit .star').hover(function () {
	var block = $(this).parents('.rating');
	block.find('.rating__activeline').css({ width: '0%' });
	var ind = $(this).index() + 1;
	var linew = ind / block.find('.star').length * 100;
	setrating(block, linew);
}, function () {
	var block = $(this).parents('.rating');
	block.find('.star').removeClass('active');
	var ind = block.find('input').val();
	var linew = ind / block.find('.star').length * 100;
	setrating(block, linew);
});
$('.rating.edit .star').click(function (event) {
	event.preventDefault();
	var block = $(this).parents('.rating');
	var re = $(this).index() + 1;
	block.find('input').val(re);
	var linew = re / block.find('.star').length * 100;
	setrating(block, linew);
});
$.each($('.rating'), function (index, val) {
	var ind = $(this).find('input').val();
	var linew = ind / $(this).parent().find('.star').length * 100;
	setrating($(this), linew);
});
function setrating(th, val) {
	th.find('.rating__activeline').css({ width: val + '%' });
}
//CHECK
$.each($('.check'), function (index, val) {
	if ($(this).find('input').prop('checked') == true) {
		$(this).addClass('active');
	}
});
$('body').off('click', '.check', function (event) { });
$('body').on('click', '.check', function (event) {
	if (!$(this).hasClass('disable')) {
		var target = $(event.target);
		if (!target.is("a")) {
			$(this).toggleClass('active');
			if ($(this).hasClass('active')) {
				$(this).find('input').prop('checked', true);
			} else {
				$(this).find('input').prop('checked', false);
			}
		}
	}
});
if ($('select').length > 0) {
	function selectscrolloptions() {
		var scs = 100;
		var mss = 50;
		if (isMobile.any()) {
			scs = 10;
			mss = 1;
		}
		var opt = {
			cursorcolor: "rgb(253, 155, 0)",
			cursorwidth: "3px",
			background: "",
			autohidemode: false,
			bouncescroll: false,
			cursorborderradius: "0px",
			scrollspeed: scs,
			mousescrollstep: mss,
			directionlockdeadzone: 0,
			cursorborder: "0px solid #fff",
		};
		return opt;
	}

	function select() {
		$.each($('select'), function (index, val) {
			var ind = index;
			$(this).hide();
			if ($(this).parent('.select-block').length == 0) {
				$(this).wrap("<div class='select-block " + $(this).attr('class') + "-select-block'></div>");
			} else {
				$(this).parent('.select-block').find('.select').remove();
			}
			var milti = '';
			var check = '';
			var sblock = $(this).parent('.select-block');
			var soptions = "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
			if ($(this).attr('multiple') == 'multiple') {
				milti = 'multiple';
				check = 'check';
			}
			$.each($(this).find('option'), function (index, val) {
				if ($(this).attr('value') != '') {
					soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + $(this).attr('class') + " " + check + "'>" + $(this).html() + "</div>";
				} else if ($(this).parent().attr('data-label') == 'on') {
					if (sblock.find('.select__label').length == 0) {
						sblock.prepend('<div class="select__label">' + $(this).html() + '</div>');
					}
				}
			});
			soptions = soptions + "</div></div></div>";
			if ($(this).attr('data-type') == 'search') {
				sblock.append("<div data-type='search' class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
					"<div class='select-title'>" +
					"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
					"<input data-value='" + $(this).find('option[selected="selected"]').html() + "' class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "' />" +
					"</div>" +
					soptions +
					"</div>");
				$('.select_' + ind).find('input.select-title__value').jcOnPageFilter({
					parentSectionClass: 'select-options_' + ind,
					parentLookupClass: 'select-options__value_' + ind,
					childBlockClass: 'select-options__value_' + ind
				});
			} else {
				sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
					"<div class='select-title'>" +
					"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
					"<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'>" + $(this).find('option[selected="selected"]').html() + "</div>" +
					"</div>" +
					soptions +
					"</div>");
			}
			if ($(this).find('option[selected="selected"]').val() != '') {
				sblock.find('.select').addClass('focus');
			}
			if ($(this).attr('data-req') == 'on') {
				$(this).addClass('req');
			}
			$(".select_" + ind + " .select-options-scroll").niceScroll('.select-options-list', selectscrolloptions());
		});
	}
	select();

	$('body').on('keyup', 'input.select-title__value', function () {
		$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
		$(this).parents('.select').addClass('active');
		$(this).parents('.select').find('.select-options').slideDown(50, function () {
			$(this).find(".select-options-scroll").getNiceScroll().resize();
		});
		$(this).parents('.select-block').find('select').val('');
	});
	$('body').on('click', '.select', function () {
		if (!$(this).hasClass('disabled')) {
			$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
			$(this).toggleClass('active');
			$(this).find('.select-options').slideToggle(50, function () {
				$(this).find(".select-options-scroll").getNiceScroll().resize();
			});

			//	var input=$(this).parent().find('select');
			//removeError(input);

			if ($(this).attr('data-type') == 'search') {
				if (!$(this).hasClass('active')) {
					searchselectreset();
				}
				$(this).find('.select-options__value').show();
			}
		}
	});
	$('body').on('click', '.select-options__value', function () {
		if ($(this).parents('.select').hasClass('multiple')) {
			if ($(this).hasClass('active')) {
				if ($(this).parents('.select').find('.select-title__value span').length > 0) {
					$(this).parents('.select').find('.select-title__value').append('<span data-value="' + $(this).data('value') + '">, ' + $(this).html() + '</span>');
				} else {
					$(this).parents('.select').find('.select-title__value').data('label', $(this).parents('.select').find('.select-title__value').html());
					$(this).parents('.select').find('.select-title__value').html('<span data-value="' + $(this).data('value') + '">' + $(this).html() + '</span>');
				}
				$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', true);
				$(this).parents('.select').addClass('focus');
			} else {
				$(this).parents('.select').find('.select-title__value').find('span[data-value="' + $(this).data('value') + '"]').remove();
				if ($(this).parents('.select').find('.select-title__value span').length == 0) {
					$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
					$(this).parents('.select').removeClass('focus');
				}
				$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', false);
			}
			return false;
		}

		if ($(this).parents('.select').attr('data-type') == 'search') {
			$(this).parents('.select').find('.select-title__value').val($(this).html());
			$(this).parents('.select').find('.select-title__value').attr('data-value', $(this).html());
		} else {
			$(this).parents('.select').find('.select-title__value').attr('class', 'select-title__value value_' + $(this).data('value'));
			$(this).parents('.select').find('.select-title__value').html($(this).html());

		}

		$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
		if ($.trim($(this).data('value')) != '') {
			$(this).parents('.select-block').find('select').val($(this).data('value'));
			$(this).parents('.select-block').find('select').find('option[value="' + $(this).data('value') + '"]').attr('selected', 'selected');
		} else {
			$(this).parents('.select-block').find('select').val($(this).html());
			$(this).parents('.select-block').find('select').find('option[value="' + $(this).html() + '"]').attr('selected', 'selected');
		}


		if ($(this).parents('.select-block').find('select').val() != '') {
			$(this).parents('.select-block').find('.select').addClass('focus');
		} else {
			$(this).parents('.select-block').find('.select').removeClass('focus');

			$(this).parents('.select-block').find('.select').removeClass('err');
			$(this).parents('.select-block').parent().removeClass('err');
			$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
		}
		if (!$(this).parents('.select').data('tags') != "") {
			if ($(this).parents('.form-tags').find('.form-tags__item[data-value="' + $(this).data('value') + '"]').length == 0) {
				$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="' + $(this).data('value') + '" href="" class="form-tags__item">' + $(this).html() + '<span class="fa fa-times"></span></a>');
			}
		}
		$(this).parents('.select-block').find('select').change();

		if ($(this).parents('.select-block').find('select').data('update') == 'on') {
			select();
		}
	});
	$(document).on('click touchstart', function (e) {
		if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
			$('.select').removeClass('active');
			$('.select-options').slideUp(50, function () { });
			searchselectreset();
		};
	});
	$(document).on('keydown', function (e) {
		if (e.which == 27) {
			$('.select').removeClass('active');
			$('.select-options').slideUp(50, function () { });
			searchselectreset();
		}
	});
}
let original_positions = [];
let da_elements = document.querySelectorAll('[data-da]');
let da_elements_array = [];
let da_match_media = [];

if (da_elements.length > 0) {
	let number = 0;
	for (let index = 0; index < da_elements.length; index++) {
		const da_element = da_elements[index];
		const da_move = da_element.getAttribute('data-da');
		const da_array = da_move.split(',');
		if (da_array.length == 3) {
			da_element.setAttribute('data-da-index', number);

			original_positions[number] = {
				"parent": da_element.parentNode,
				"index": index_in_parent(da_element)
			};

			da_elements_array[number] = {
				"element": da_element,
				"destination": document.querySelector('.' + da_array[0].trim()),
				"place": da_array[1].trim(),
				"breakpoint": da_array[2].trim()
			}
			number++;
		}
	}
	dynamic_adapt_sort(da_elements_array);
	for (let index = 0; index < da_elements_array.length; index++) {
		const el = da_elements_array[index];
		const da_breakpoint = el.breakpoint;
		const da_type = "max";

		da_match_media.push(window.matchMedia("(" + da_type + "-width: " + da_breakpoint + "px)"));
		da_match_media[index].addListener(dynamic_adapt);

	}
}

function dynamic_adapt(e) {
	for (let index = 0; index < da_elements_array.length; index++) {
		const el = da_elements_array[index];
		const da_element = el.element;
		const da_destination = el.destination;
		const da_place = el.place;
		const da_breakpoint = el.breakpoint;
		const da_classname = "_dynamic_adapt_" + da_breakpoint;

		if (da_match_media[index].matches) {

			if (!da_element.classList.contains(da_classname)) {
				let actual_index;
				if (da_place == 'first') {
					actual_index = index_of_elements(da_destination)[0];
				} else if (da_place == 'last') {
					actual_index = index_of_elements(da_destination)[index_of_elements(da_destination).length];
				} else {
					actual_index = index_of_elements(da_destination)[da_place];
				}
				da_destination.insertBefore(da_element, da_destination.children[actual_index]);
				da_element.classList.add(da_classname);
			}
		} else {

			if (da_element.classList.contains(da_classname)) {
				dynamic_adapt_back(da_element);
				da_element.classList.remove(da_classname);
			}
		}
	}
	custom_adapt();
}


dynamic_adapt();


function dynamic_adapt_back(el) {
	const da_index = el.getAttribute('data-da-index');
	const original_place = original_positions[da_index];
	const parent_place = original_place['parent'];
	const index_place = original_place['index'];
	const actual_index = index_of_elements(parent_place, true)[index_place];
	parent_place.insertBefore(el, parent_place.children[actual_index]);
}

function index_in_parent(el) {
	var children = Array.prototype.slice.call(el.parentNode.children);
	return children.indexOf(el);
}

function index_of_elements(parent, back) {
	const children = parent.children;
	const children_array = [];
	for (let i = 0; i < children.length; i++) {
		const children_element = children[i];
		if (back) {
			children_array.push(i);
		} else {

			if (children_element.getAttribute('data-da') == null) {
				children_array.push(i);
			}
		}
	}
	return children_array;
}

function dynamic_adapt_sort(arr) {
	arr.sort(function (a, b) {
		if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } //Для MobileFirst поменять
	});
	arr.sort(function (a, b) {
		if (a.place > b.place) { return 1 } else { return -1 }
	});
}

function custom_adapt() {
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}



//====================  SCROLL ========================//
$(window).scroll(function (event) {
	var scr = $(this).scrollTop();
	sectors(scr);
});
function sectors(scr) {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	if (scr > 80) {
		$('.page-home-scroll').addClass('scroll');
	} else {
		$('.page-home-scroll').removeClass('scroll');
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

$('.about__video-play').click(function (e) {
	$(this).parent().find('.about__video-poster').fadeOut();
	$(this).parent().find('video').fadeIn().get(0).play();
	$(this).parent().parent().find('.about__video-pause').css("opacity", ".5");
	$(this).fadeOut();
});

$('.about__video-pause').click(function () {
	$(this).parent().find('video').get(0).pause();
	$(this).parent().find('.about__video-poster, .about__video-play').fadeIn();
	$(this).css("opacity", "0");
})
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
$('.header-middle__login').click(function () {
	$('.sitebar, .header-menu__icon').removeClass("active");
});

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
			breakpoint: 600,
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

$('.item-cards__favotite, .card-item__favotite').click(function () {
	$(this).toggleClass('item-cards__favorite-add');
})

//==================== <-- Favorite --> ========================//

//==================== <-- Products-Counts --> ========================//

$('.products-counts__prev').click(function () {
	inc(this.parentNode, -1);
	orderCount($(this));
});
$('.products-counts__next').click(function () {
	inc(this.parentNode, 1);
	orderCount($(this));
});
function inc(Obj, Val) {
	Obj = $(Obj).closest('.item-personal__cards').find('.products-counts__count');
	var val = parseInt(Obj.html());
	if (val == 0 && Val == -1) {
		return;
	};
	Obj.html(val + Val);
};
function orderCount(thin) {
	let orderCount = thin.closest('.order-count').find('.products-counts__count').html();
	let orderPrice = thin.closest('.order-count').find('.item-cards__price').html();
	orderTotal = parseFloat(orderCount) * parseFloat(orderPrice);
	thin.closest('.order-count').find('.order-total').html(orderTotal + 'грн');

	$('.total-all').text(orderPriceTotal());
}

function orderPriceTotal() {
	let orderTotal = $('.order-total');
	let result = 0;
	for (let i = 0; i <= orderTotal.length - 1; i++) {
		result += parseFloat($(orderTotal[i]).text());
	}
	return result;
}
//==================== <-- Products-Counts --> ========================//

$('.card-table__icon').click(function () {
	$(this).closest('.card-table-item').remove();
})
});
