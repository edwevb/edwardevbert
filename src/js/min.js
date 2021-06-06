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
	$('.preloader').delay(3000).fadeOut('slow', function(){
			$('.myNameHeader').addClass('myNameHeaderShow');
		});
});

$(window).scroll(function(){
	var wScroll = $(this).scrollTop();

	if (wScroll >= $('.welcome').offset().top) {
		$('.welcome').fadeIn(2000);
	}

	if (wScroll > $('#aboutSection').offset().top - 250) {
		let aboutText = $('.aboutText');
		aboutText.addClass('aboutTextShow');
	}

	if (wScroll > $('#skillSection').offset().top - 50) {
		$('.skillsRight').addClass('skillsRightShow');
		$('.skillsLeft').addClass('skillsLeftShow');
	}

	if (wScroll > $('#portofolioSection').offset().top - 250) {
		let portofolioContent = $('.portofolioContent');
		portofolioContent.addClass('portofolioContentShow');
	}

	if (wScroll > $('#coursesSection').offset().top - 250) {
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