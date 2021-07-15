import "bootstrap"
$(document).ready(function(){

	$('.js-scroll').on('click', function(e) {
		let href = $(this).attr('href');
		let elHref = $(href);

		$('html, body').animate({
			scrollTop : elHref.offset().top - 50
		}, 1000, 'easeInOutExpo');
		e.preventDefault();
	});

	$('#contactPopover').popover({
		html:true,
		title:'Contact Info',
		content:`<p>Please <strong>confirm</strong> reCAPTCHA to enable send button</p><p>Your message will be send to my email <strong>edwardevbert@gmail.com</strong></p><p><a href="mailto:edwardevbert@gmail.com">Click here</a> to send from your email apps.</p>`,
		toggle:'popover',
		trigger:'focus'
	});

	$(window).scroll(function(){
		var wScroll = $(this).scrollTop();
		if (wScroll > $('.welcome').offset().top - 100){
			$(".scrollTop").addClass("showScrollTop");
		} else {
			$(".scrollTop").removeClass("showScrollTop");
		}

		if (wScroll > 10){
			$('#navbar').removeClass('bg-transparent');
			$('#navbar').addClass('bg-nav-scroll');
		} else {
			$('#navbar').removeClass('bg-nav-scroll');
			$('#navbar').addClass('bg-transparent');
		}

		if (wScroll > $('.welcome').offset().top){
			let welcomeDesc = $('.welcomeDesc');
			welcomeDesc.addClass('welcomeDescShow');
		}

		if (wScroll < $('.welcome').offset().top - 100){
			let welcomeDesc = $('.welcomeDesc');
			welcomeDesc.removeClass('welcomeDescShow');
		}	

		if (wScroll > $('#aboutSection').offset().top - 100){
			let aboutText = $('.aboutText');
			aboutText.addClass('aboutTextShow');
		}

		if (wScroll > $('#skillSection').offset().top - 100){
			$('.skillsRight').addClass('skillsRightShow');
			$('.skillsLeft').addClass('skillsLeftShow');
		}

		if (wScroll < $('#skillSection').offset().top - 100){
			$('.skillsRight').removeClass('skillsRightShow');
			$('.skillsLeft').removeClass('skillsLeftShow');
		}

		if (wScroll > $('#portofolioSection').offset().top - 250){
			let portofolioContent = $('.portofolioContent');
			portofolioContent.addClass('portofolioContentShow');
		}

		if (wScroll > $('.portofolio-side-image').offset().top - 300){
			let portofolioDesc = $('.portofolioDesc');
			portofolioDesc.addClass('portofolioDescShow');
		}

		if (wScroll < $('.portofolio-side-image').offset().top - 300){
			let portofolioDesc = $('.portofolioDesc');
			portofolioDesc.removeClass('portofolioDescShow');
		}

		if (wScroll > $('#coursesSection').offset().top - 400){
			let coursesList = $('.coursesList');
			coursesList.each(function(indexList){
				setTimeout(function(){
					coursesList.eq(indexList).addClass('coursesListShow');
				}, 500 * (indexList+1));
			});
		}
	});
});

$('body').css('overflow', 'hidden');
$(window).on('load', async function(){
	await $('.preloader').fadeOut('slow', function(){
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

$('document').ready(function(){
	$('body').materializeInputs();
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
			await console.log(res.message);
			await successAlert(res.message);
			await requestPreLoaderRemove();
			await resetContactForm(res);
		},
		error: async (xhr) => {
			await console.log(xhr.responseText);
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
		html: `Your message has been send!`,
		customClass:{
			confirmButton: 'btn btn-dark px-5',
		},
		buttonsStyling:false
	});
}

const warningAlert = (xhr) => {
	Swal.fire({
		icon: 'error',
		title: 'Oops.. something error!',
		text: xhr.responseJSON.message,
	}).then(()=>{
		formValidationShow(xhr);
	});
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
				keys = $(`#${arr[0]}`);
			}else{
				keys = $(`#${key}`);
			}
			keys.closest('.form-control')
			.addClass('is-invalid');
			keys.closest('.form-group')
			.append(`<div class="invalid-feedback" style="position: absolute;">${value}</div>`);
		});
	}
}

const resetContactForm = async (res) => {
	await $.each(res.data, (key) => {
		$(`#${key}`)
		.closest('.form-control').val(null);
	});
	await $('body').materializeInputs();
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
}

const requestPreLoaderRemove = async () =>{
	await $('#btn-submit').html(`<i class="far fa-paper-plane"></i> Send`);
	await grecaptcha.reset();
}