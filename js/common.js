
$(function () {

	// Custom JS

 
	var urlParams;
	(window.onpopstate = function () {
		var match,
			pl = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
			query = window.location.search.substring(1);

		urlParams = {};
		while (match = search.exec(query))
			urlParams[decode(match[1])] = decode(match[2]);

	})();

	$('.buy-btns').on('click', function () {
		var service = $(this).attr('data-service');
		$('#popup-buy').find('#popup-order-place').val(service)
	})
	url = window.location.hash;
	hash = url.split('#')[1];

	if (hash) {

		if (urlParams["comment"] != 0) {
			document.getElementsByName("comment")[0].value = urlParams["comment"];
		} else if (document.getElementsByName("comment")[0].value == "") {
			document.getElementsByName("comment")[0].value = "";
		}
		if (urlParams["name"] != 0) {
			document.getElementsByName("name")[0].value = urlParams["name"];
		}

		if (urlParams["email"] != 0) {
			document.getElementsByName("email")[0].value = urlParams["email"];
		}

		if (urlParams["phone"] != 0) {
			document.getElementsByName("phone")[0].value = urlParams["phone"];
		}

		if (urlParams["city_company"] != 0) {
			document.getElementsByName("city_company")[0].value = urlParams["city_company"];
		}

		if (urlParams["promocod"] != 0) {
			document.getElementsByName("promocod")[0].value = urlParams["promocod"];
		}

		$(".h-place").each(function () {
			var element = $(this);
			if ($(this).val() == "undefined") {
				$(this).val("");
			}
			else if ($(this).val() != 0) {
				$(this).addClass("not-empty");
			}
			else {
				$(this).val("");
			}
		});
		if (screen.width < 414) {
			// window.location.replace("https://open-sales.ru/mobile/"+ urlParams + window.location.hash);
		}
		console.log(url = window.location)
		$.magnificPopup.open({
			items: {
				src: "#" + hash,
				type: 'inline',
				closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>'
			}

		});

	} else {
		// do something else
	}
 

	/*
	НА ОПЛАТУ НЕ НУЖЕН AJAX !!!!!!!!!!!!!!!!!!!!!!!!
	$("#popup-order form").submit(function () { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "/send", //Change
			data: th.serialize()
		}).done(function () {
			//alert("Thank you!");
			$.magnificPopup.open({
				items: {
					src: '#tnx-msg',
					type: 'inline',
					closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>'
				}

			});

			$('body').addClass('no-scroll')
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
				 $('#mestovzale').val('');
				$('.required').removeClass('required')
				// $('.placeholder').show()
				$.magnificPopup.close();
				$('body').removeClass('no-scroll')
			}, 4000);
		});
		return false;
	});
	*/


	$("body").on("click", ".mobile-menu-btn", function (e) {
		e.preventDefault();
	});
	$("body").on("mouseup", function (e) {
		var mobileMenu = $(".mobile-menu-panel");
		var mobileMenuLink = $(".mobile-menu-btn");
		if (mobileMenuLink.is(e.target)) {
			if ($(".mobile-menu-btn").is(".active")) {
				$('.topline').removeClass("active")
				mobileMenuLink.removeClass("active").next().slideUp(300);
				$('body').removeClass('no-scroll')
			}
			else {
				$('.topline').addClass("active")
				mobileMenuLink.addClass("active").next().slideDown(300)

				$('body').addClass('no-scroll')
				// $(document).on('touchmove',function(e){
				// 	e.preventDefault();
				//   });

			}
		} else {
			if (!mobileMenu.is(e.target) && mobileMenu.has(e.target).length === 0) {
				if ($(".mobile-menu-btn").is(".active")) {
					$(".mobile-menu-btn").removeClass("active").next().slideUp(300);
				} else {
				}
			}
		}
	});
	if ($(window).width() < 768) {
		$('.pb-item-heading-inner  span , .faq-item-heading-inner span').each(function () {
			var $this = $(this), text = $this.text().trim(), words = text.split(/\s+/);
			var lastWord = words.pop();
			words.push('<span>' + lastWord + '</span>');
			$this.html(words.join(' '));
		});
	}
	$("body").on('click', '[href*="#section-for-who"],[href*="#section-you-can"],[href*="#section-author-kurs"],[href*="#section-teachers"],[href*="#section-programm"],[href*="#section-price"],[href*="#section-faq"]', function (e) {
		$(".mobile-menu-btn").removeClass("active");
		$('.topline').removeClass("active");
		$(".mobile-menu-panel").slideUp(300);
		$('body').removeClass('no-scroll')
		var fixed_offset = $('.topline').height();
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
		e.preventDefault();
	});

	$("body").on("click", ".pb-item-top", function (e) {
		if ($(this).parent().is('.active')) {
			$(this).parent().removeClass('active');
			$(this).next().slideUp();
		} else {
			$(this).parent().addClass('active');
			$(this).next().slideDown();
		}
	});

	var seatInfo = '';

	$('.seat_item').on('click', function () {
		seatInfo = $(this).find('.seat_input-info').val();
		$('.seat_item').removeClass('active')
		$(this).addClass('active')
		$('.seat-hidden-btn ').slideDown();

		var place = $(this).find('.seat_input-info').val();
		$('#popup-order-place').val(place);
	})
	$('.seat-hidden-btn ').on('click', 'a', function () {
		$('#mestovzale').val(seatInfo);
		$('.seat_item').removeClass('active')
		$('.seat-hidden-btn ').slideUp();
	})
	$("body").on("click", ".faq-item-top", function (e) {
		if ($(this).parent().is('.active')) {
			$(this).parent().removeClass('active');
			$(this).next().slideUp();
		} else {
			$(this).parent().addClass('active');
			$(this).next().slideDown();
		}
	});


	$("input[name='agreement']").on('change', function () {
		if ($(this).prop("checked")) {
			$(this).parents('form').find('button').prop('disabled', false).attr('disabled', false);
		} else {
			$(this).parents('form').find('button').prop('disabled', true).attr('disabled', true);
		}
	});
	$("input.h-place").keyup(function () {
		if ($(this).val() != 0) {
			$(this).addClass("not-empty");
		} else {

			$(this).removeClass("not-empty");
		}
	});




	$("input[name='phone']").mask('+0(000) 000-0000');



	$(".popup-form-btn").magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
		callbacks: {
			open: function () {
				if ($(window).width() < 768) {
					$('body').addClass('no-scroll')

				}
			},
			close: function () {
				if ($(window).width() < 768) {
					$('body').removeClass('no-scroll')
				}
				$('#mestovzale').val('');
			}
			// e.t.c.
		},
		removalDelay: 500,
		mainClass: 'mfp-move-from-top',
	});

	$(".popup-inline").magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
		callbacks: {
			open: function () {
				if ($(window).width() < 768) {
					$('body').addClass('no-scroll')

				}
			},
			close: function () {
				if ($(window).width() < 768) {
					$('body').removeClass('no-scroll')
				}
			}
			// e.t.c.
		},
		removalDelay: 500,
		mainClass: 'mfp-move-from-top',

	});
	// $(".sign-up-form button").click(function(event){
	// 	var form_data=$(".sign-up-form").serializeArray();
	// 	var error_free=true;
	// 	for (var input in form_data){
	// 		var element = $(form_data[input]['name']);
	// 		var valid = element.hasClass("valid");
	// 		var error_element = element.hasClass("error");
	// 		if (!valid){element.addClass("error"); error_free=false;}
	// 		else{error_element.addClass("valid");}
	// 	}
	// 	if (!error_free){
	// 		event.preventDefault();
	// 	}
	// 	else{
	// 		alert('No errors: Form will be submitted');
	// 	}
	// });
	$(".popup-inline-in-popup").magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
		callbacks: {

			open: function () {
				if ($(window).width() < 768) {
					$('body').addClass('no-scroll')

				}
			},
			close: function () {
				if ($(window).width() < 768) {
					$('body').removeClass('no-scroll')
				}
			}
			// e.t.c.
		},
		removalDelay: 500,
		mainClass: 'mfp-move-from-top',

	});

	// 	$("[data-fancybox]").magnificPopup({
	// 		type: 'inline',
	// 		preloader: false,
	// 		focus: '#name',
	// 		closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
	// 		callbacks: {
	// 			open: function () {
	// 				if ($(window).width() < 768) {
	// 					$('body').addClass('no-scroll')

	// 				}
	// 			},
	// 			close: function () {
	// 				if ($(window).width() < 768) {
	// 					$('body').removeClass('no-scroll')
	// 				}

	// 			}
	// 			// e.t.c.
	// 		},
	// 		removalDelay: 500,
	// 		mainClass: 'mfp-move-from-top',
	// 	});
	// <!-- CUSTOM SELECT -->
	var x, i, j, selElmnt, a, b, c;
	/*look for any elements with the class "custom-select":*/
	x = document.getElementsByClassName("custom-selects");
	for (i = 0; i < x.length; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		/*for each element, create a new DIV that will act as the selected item:*/
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/*for each element, create a new DIV that will contain the option list:*/
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 1; j < selElmnt.length; j++) {
			/*for each option in the original select element,
			create a new DIV that will act as an option item:*/
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function (e) {
				/*when an item is clicked, update the original select box,
				and the selected item:*/
				var y, i, k, s, h;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				h = this.parentNode.previousSibling;
				for (i = 0; i < s.length; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName("same-as-selected");
						for (k = 0; k < y.length; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same-as-selected");
						break;
					}
				}
				h.click();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function (e) {
			/*when the select box is clicked, close any other select boxes,
			and open/close the current select box:*/
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
			this.parentElement.classList.toggle("active");

		});

	}

	function closeAllSelect(elmnt) {
		/*a function that will close all select boxes in the document,
		except the current select box:*/
		var x, y, i, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		z = document.getElementsByClassName("custom-selects");
		for (i = 0; i < y.length; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i)
			} else {
				y[i].classList.remove("select-arrow-active");
				z[i].classList.remove("active");
			}
		}
		for (i = 0; i < x.length; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select-hide");
			}
		}
	}
	$('.select-selected').html('Выберите поток <span class="star">*</span>');
	/*if the user clicks anywhere outside the select box,
	  then close all select boxes:*/
	document.addEventListener("click", closeAllSelect);

	
	$('.section-donation input[name="sum"]').mask('000.000.000.000.000', {reverse: true});
	$('.section-donation input[name="client_phone"]').mask('+0(000) 000-0000');

	$('.section-donation .sum-item').on('click', function () {
		$('.section-donation .sum-item').removeClass('active');

		$(this).addClass('active');

		$('.section-donation input[name="sum"]').val($(this).data('sum'));
		$('.section-donation input[name="sum"]').keyup();
	})
	$('.section-donation input[name="sum"]').on('input', function () {
		$('.section-donation .sum-item').removeClass('active');

		$('.section-donation .sum-item').each(function () {
			if ($('.section-donation input[name="sum"]').val() == $(this).data('sum')) $(this).addClass('active');
		})
	})
});

$(document).on('click', '.select-items div', function () {
	$(".select-selected").addClass("selected");
})

$(window).scroll(function () {
	if ($(window).width() < 992) {
		$offset = 20
	} else {
		$offset = 0
	}
	if ($(window).scrollTop() > $offset) {

		$(".topline").addClass('fixed');
	} else {
		$(".topline").removeClass('fixed');
	}
	$('#carousel').flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		itemWidth: 80,
		itemMargin: 2,
		asNavFor: '#slider'
	});

	$('#slider').flexslider({
		animation: "slide",
		controlNav: false,
		animationSpeed: 300,
		animationLoop: false,
		slideshow: false,
		sync: "#carousel"
	});
});
