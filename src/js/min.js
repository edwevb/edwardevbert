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
	$('.preloader').delay(1500).fadeOut('slow', function(){
			$('.myNameHeader').addClass('myNameHeaderShow');
		});
});

$(function($) {
	var followScroll = $('.followScroll'),
	originalY = followScroll.offset().top - 50;
	var topMargin = 20;
	var stopScroll = $('.skillsLeft').offset().top - 300;
	followScroll.css('position', 'relative');
	if ($(window).width() > 768) {
		$(window).on('scroll', function(event) {
			var scrollTop = $(this).scrollTop();
			if (scrollTop > originalY) {
				followScroll.stop(true,true).animate({
					top: scrollTop < originalY
					? 0
					: scrollTop - originalY + topMargin
				}, 300);
			}
			if (scrollTop > 2600) {
				followScroll.stop();
			}
		});
	}

});


$(window).scroll(function(){
	var wScroll = $(this).scrollTop();

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

	if (wScroll > $('#skillSection').offset().top - 50) {
		$('.skillsRight').addClass('skillsRightShow');
		$('.skillsLeft').addClass('skillsLeftShow');
	}

	if (wScroll < $('#skillSection').offset().top - 50) {
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