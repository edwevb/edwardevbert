import "bootstrap"

$(window).scroll(function(){ 
	if ($(this).scrollTop() > 650) { 
		$('#scroll').fadeIn(); 
	} else { 
		$('#scroll').fadeOut(); 
	} 
});

$('#scroll').click(function(){ 
	$("html, body").animate({ scrollTop: 0 }, 600); 
	return false; 
}); 

$(window).on('load',function(){
	$('body').css('overflow', 'hidden');
	$('.preloader').delay(2000).fadeOut('slow', function(){
			$('.myNameHeader').addClass('myNameHeaderShow');
			$('body').css('overflow', 'visible');
		});
});

$(function($) {
	let followScroll = $('.followScroll'),
	originalY = followScroll.offset().top - 50,
	topMargin = 20

	followScroll.css('position', 'relative');
	if ($(window).width() > 768) {
		$(window).on('scroll', function(event) {
			var scrollTop = $(this).scrollTop();
			if (scrollTop > originalY) {
				followScroll.stop(true,true).animate({
					top: scrollTop < originalY
					? 0
					: scrollTop - originalY + topMargin
				});
			}
			if (scrollTop > 2150) {
				followScroll.stop();
			}
		});
	}

});


$(window).scroll(function(){
	var wScroll = $(this).scrollTop();
	if ($(window).scrollTop() > $('.welcome').offset().top) {
		$('#navbar').removeClass('bg-transparent');
		$('#navbar').addClass('sticky');
	} else {
		$('#navbar').removeClass('sticky');
		$('#navbar').addClass('bg-transparent');
	}

	if (wScroll > $('.welcome').offset().top - 150) {
		let welcomeDesc = $('.welcomeDesc');
		welcomeDesc.show();
		welcomeDesc.addClass('welcomeDescShow');
	}

	if (wScroll < $('.welcome').offset().top - 150) {
		let welcomeDesc = $('.welcomeDesc');
		welcomeDesc.removeClass('welcomeDescShow');
	}	

	if (wScroll > $('#aboutSection').offset().top - 250) {
		let aboutText = $('.aboutText');
		aboutText.addClass('aboutTextShow');
	}

	if (wScroll > $('#skillSection').offset().top - 100) {
		$('.skillsRight').addClass('skillsRightShow');
		$('.skillsLeft').addClass('skillsLeftShow');
	}

	if (wScroll < $('#skillSection').offset().top - 100) {
		$('.skillsRight').removeClass('skillsRightShow');
		$('.skillsLeft').removeClass('skillsLeftShow');
	}

	if (wScroll > $('#portofolioSection').offset().top - 250) {
		let portofolioContent = $('.portofolioContent');
		portofolioContent.addClass('portofolioContentShow');
	}

	if (wScroll > $('.portofolio-side-image').offset().top - 300) {
		let portofolioDesc = $('.portofolioDesc');
		portofolioDesc.addClass('portofolioDescShow');
	}

	if (wScroll < $('.portofolio-side-image').offset().top - 300) {
		let portofolioDesc = $('.portofolioDesc');
		portofolioDesc.removeClass('portofolioDescShow');
	}

	if (wScroll > $('#coursesSection').offset().top - 400) {
		var coursesList = $('.coursesList');
		coursesList.each(function(indexList){
			setTimeout(function(){
				coursesList.eq(indexList).addClass('coursesListShow');
			}, 500 * (indexList+1));
		});
	}

	if (wScroll > $('#contactSection').offset().top - 100) {
		var contactRight = $('.contactRight');
		contactRight.each(function(indexList){
			setTimeout(function(){
				contactRight.eq(indexList).addClass('contactRightShow');
			}, 100 * (indexList+1));
		});
	}
});


$.fn.materializeInputs = function(selectors) {
	if (typeof(selectors)==='undefined') selectors = "input, textarea, select";

	function setInputValueAttr(element) {
		element.setAttribute('value', element.value);
	}


	this.find(selectors).each(function () {
		setInputValueAttr(this);
	});

	this.on("keyup change", selectors, function() {
		setInputValueAttr(this);
	});
};

$('form').on('submit', function(e){
	e.preventDefault();
	const input = document.getElementsByClassName('form-control'),
	data = {};
	for (var i = 0; i < input.length; i++) {
		data[input[i].name] = input[i].value;
	}
	console.log(data);
	Swal.fire({
		icon: 'success',
		iconColor:'#3F3D56',
		title: 'Thank you for your feedback!',
		html: `Your message has been send! <br> but to make sure, please also send manually to my email below. <br> <a href="mailto:edwardevbert@gmail.com" class="text-decoration-none">edwardevbert@gmail.com</a>`,
		customClass:{
			confirmButton: 'btn btn-dark px-5',
		},
		buttonsStyling:false
	});
});

$('#myBlog').on('click', ()=>{
	Swal.fire({
		html:`<h1 class="text-light">Comming soon!</h1>`,
		width: 600,
		padding: '3em',
		background: '#3F3D56'
	});
});