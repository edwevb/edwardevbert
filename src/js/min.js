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

$('form').on('submit', async function(e){
	e.preventDefault();
	removeValidationElem();
	const input = document.getElementsByClassName('form-control'),
	url = 'https://edwardemailapi.herokuapp.com/api/contact',
	data = {};
	for (let i = 0; i < input.length; i++) {
		data[input[i].name] = input[i].value;
	}
	await doAjax(data, url);
});

const doAjax = (data, url) => {
	$.ajax({
		type:'post',
		url:url,
		data:data,
		dataType:'json',
		beforeSend:() => {
			requestPreLoader();
		},
		success: async (res) => {
			await console.log(res.message)
			await successAlert(res.message);
			await requestPreLoaderRemove();
		},
		error: async (xhr) => {
			console.log(xhr.responseText)
			if (xhr.status == 422) {
				await warningAlert(xhr);
			}else{
				await serverTimeOut();
			}
			await requestPreLoaderRemove();
		}
	});
}

const successAlert = (msg) =>{
	Swal.fire({
		icon: 'success',
		iconColor:'#3F3D56',
		title: msg,
		html: `Your message has been send! <br> to make sure, please also send manually to my email below. <br> <a href="mailto:edwardevbert@gmail.com" class="text-decoration-none">edwardevbert@gmail.com</a>`,
		customClass:{
			confirmButton: 'btn btn-dark px-5',
		},
		buttonsStyling:false
	});
}

const warningAlert = (res) => {
	Swal.fire({
		icon: 'error',
		title: 'Oops.. something error!',
		text: res.message,
	}).then(()=>{
		formValidationShow(res);
	});
	$('input[name=captcha]').val(null);
}

const serverTimeOut = () => {
	Swal.fire({
		icon: 'error',
		title: 'Server lost connection!',
		text: 'Please try again later',
	});
	$('input[name=captcha]').val(null);
}

const formValidationShow = (xhr) => {
	const res = xhr.responseJSON;
	let keys = "";
	if ($.isEmptyObject(res) == false) {
		$.each(res.errors, (key, value) => {
			if(key.indexOf(".") != -1){
				const arr = key.split(".");
				keys = $(`#${arr[0]}`)
			}else{
				keys = $(`#${key}`)
			}
			keys.closest('.form-control')
			.addClass('is-invalid');
			keys.closest('.form-group')
			.append(`<div class="invalid-feedback" style="position: absolute;">${value}</div>`)
		});
	}
}

const removeValidationElem = () => {
	const form = $('#contact-form');
	form.find('.invalid-feedback').remove();
	form.find('.form-control').removeClass('is-invalid');
}

const requestPreLoader = async () =>{
	await $('#btn-submit').prop('disabled', true);
	await $('#btn-submit').css('cursor', 'not-allowed');
	await $('#btn-submit').html(` <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
		Loading...`);
	await grecaptcha.reset();
}

const requestPreLoaderRemove = async () =>{
	await $('#btn-submit').html(`<i class="far fa-paper-plane"></i> Send`);
	await grecaptcha.reset();
}


$('#myBlog').on('click', ()=>{
	Swal.fire({
		html:`<h1 class="text-light">Comming soon!</h1>`,
		width: 600,
		padding: '3em',
		background: '#3F3D56'
	});
});