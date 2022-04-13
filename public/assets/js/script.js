$(document).ready(function () {
    $('.js-scroll').on('click', function (e) {
        var href = $(this).attr('href');
        var elHref = $(href);
        $('html, body').animate({
            scrollTop: elHref.offset().top - 50
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });
    $('#contactPopover').popover({
        html: true,
        title: 'Contact Info',
        content: "<p>Please <strong>confirm</strong> reCAPTCHA to enable send button</p><p>Your message will be send to my email <strong>edwardevbert@gmail.com</strong></p><p><a href=\"mailto:edwardevbert@gmail.com\">Click here</a> to send from your email apps.</p>",
        toggle: 'popover',
        trigger: 'focus'
    });
    $(window).scroll(function () {
        var wScroll = $(this).scrollTop();

        if (wScroll > $('.welcome').offset().top - 100) {
            $(".scrollTop").addClass("showScrollTop");
        } else {
            $(".scrollTop").removeClass("showScrollTop");
        }

        if (wScroll > 10) {
            $('#navbar').removeClass('bg-transparent');
            $('#navbar').addClass('bg-nav-scroll');
        } else {
            $('#navbar').removeClass('bg-nav-scroll');
            $('#navbar').addClass('bg-transparent');
        }

        if (wScroll > $('.welcome').offset().top) {
            var welcomeDesc = $('.welcomeDesc');
            welcomeDesc.addClass('welcomeDescShow');
        }

        if (wScroll < $('.welcome').offset().top - 100) {
            var _welcomeDesc = $('.welcomeDesc');

            _welcomeDesc.removeClass('welcomeDescShow');
        }

        if (wScroll > $('#aboutSection').offset().top - 100) {
            var aboutText = $('.aboutText');
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
            var portofolioContent = $('.portofolioContent');
            portofolioContent.addClass('portofolioContentShow');
        }

        if (wScroll > $('.portofolio-side-image').offset().top - 300) {
            var portofolioDesc = $('.portofolioDesc');
            portofolioDesc.addClass('portofolioDescShow');
        }

        if (wScroll < $('.portofolio-side-image').offset().top - 300) {
            var _portofolioDesc = $('.portofolioDesc');

            _portofolioDesc.removeClass('portofolioDescShow');
        }

        // if (wScroll > $('#coursesSection').offset().top - 400) {
        //   var coursesList = $('.coursesList');
        //   coursesList.each(function (indexList) {
        //     setTimeout(function () {
        //       coursesList.eq(indexList).addClass('coursesListShow');
        //     }, 500 * (indexList + 1));
        //   });
        // }
    });
});
$('body').css('overflow', 'hidden');
$(window).on('load', /*#__PURE__*/ _asyncToGenerator( /*#__PURE__*/ _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return $('.preloader').fadeOut('slow', function () {
                        $('.myNameHeader').addClass('myNameHeaderShow');
                        $('body').css('overflow', 'visible');
                    });

                case 2:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee);
})));
$(function ($) {
    var followScroll = $('.followScroll'),
        originalY = followScroll.offset().top - 50,
        topMargin = 20;
    followScroll.css('position', 'relative');

    if ($(window).width() > 768) {
        $(window).on('scroll', function (event) {
            var scrollTop = $(this).scrollTop();

            if (scrollTop > originalY) {
                followScroll.stop(true, true).animate({
                    top: scrollTop < originalY ? 0 : scrollTop - originalY + topMargin
                });
            }

            if (scrollTop > 2150) {
                followScroll.stop();
            }
        });
    }
});
$('document').ready(function () {
    $('body').materializeInputs();
});

$.fn.materializeInputs = function (selectors) {
    if (typeof selectors === 'undefined') selectors = "input, textarea, select";

    function setInputValueAttr(element) {
        element.setAttribute('value', element.value);
    }

    this.find(selectors).each(function () {
        setInputValueAttr(this);
    });
    this.on("keyup change", selectors, function () {
        setInputValueAttr(this);
    });
};

$('form').on('submit', /*#__PURE__*/ function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/ _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(e) {
        var input, url, data, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        e.preventDefault();
                        removeValidationElem();
                        input = document.getElementsByClassName('form-control'), url = 'https://edwardemailapi.herokuapp.com/api/contact', data = {};

                        for (i = 0; i < input.length; i++) {
                            data[input[i].name] = input[i].value;
                        }

                        _context2.next = 6;
                        return doAjax(data, url);

                    case 6:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2);
    }));

    return function (_x) {
        return _ref2.apply(this, arguments);
    };
}());

var doAjax = function doAjax(data, url) {
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function beforeSend() {
            requestPreLoader();
        },
        success: function () {
            var _success = _asyncToGenerator( /*#__PURE__*/ _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3(res) {
                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return console.log(res.message);

                            case 2:
                                _context3.next = 4;
                                return successAlert(res.message);

                            case 4:
                                _context3.next = 6;
                                return requestPreLoaderRemove();

                            case 6:
                                _context3.next = 8;
                                return resetContactForm(res);

                            case 8:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3);
            }));

            function success(_x2) {
                return _success.apply(this, arguments);
            }

            return success;
        }(),
        error: function () {
            var _error = _asyncToGenerator( /*#__PURE__*/ _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4(xhr) {
                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return console.log(xhr.responseText);

                            case 2:
                                if (!(xhr.status == 422)) {
                                    _context4.next = 7;
                                    break;
                                }

                                _context4.next = 5;
                                return warningAlert(xhr);

                            case 5:
                                _context4.next = 9;
                                break;

                            case 7:
                                _context4.next = 9;
                                return serverTimeOut();

                            case 9:
                                _context4.next = 11;
                                return requestPreLoaderRemove();

                            case 11:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4);
            }));

            function error(_x3) {
                return _error.apply(this, arguments);
            }

            return error;
        }()
    });
};

var successAlert = function successAlert(msg) {
    Swal.fire({
        icon: 'success',
        iconColor: '#3F3D56',
        title: msg,
        html: "Your message has been send!",
        customClass: {
            confirmButton: 'btn btn-dark px-5'
        },
        buttonsStyling: false
    });
};

var warningAlert = function warningAlert(xhr) {
    Swal.fire({
        icon: 'error',
        title: 'Oops.. something error!',
        text: xhr.responseJSON.message
    }).then(function () {
        formValidationShow(xhr);
    });
};

var serverTimeOut = function serverTimeOut() {
    Swal.fire({
        icon: 'error',
        title: 'Server lost connection!',
        text: 'Please try again later'
    });
    $('input[name=captcha]').val(null);
};

var formValidationShow = function formValidationShow(xhr) {
    var res = xhr.responseJSON;
    var keys = "";

    if ($.isEmptyObject(res) == false) {
        $.each(res.errors, function (key, value) {
            if (key.indexOf(".") != -1) {
                var arr = key.split(".");
                keys = $("#".concat(arr[0]));
            } else {
                keys = $("#".concat(key));
            }

            keys.closest('.form-control').addClass('is-invalid');
            keys.closest('.form-group').append("<div class=\"invalid-feedback\" style=\"position: absolute;\">".concat(value, "</div>"));
        });
    }
};

var resetContactForm = /*#__PURE__*/ function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/ _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5(res) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return $.each(res.data, function (key) {
                            $("#".concat(key)).closest('.form-control').val(null);
                        });

                    case 2:
                        _context5.next = 4;
                        return $('body').materializeInputs();

                    case 4:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5);
    }));

    return function resetContactForm(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

var removeValidationElem = function removeValidationElem() {
    var form = $('#contact-form');
    form.find('.invalid-feedback').remove();
    form.find('.form-control').removeClass('is-invalid');
};

var requestPreLoader = /*#__PURE__*/ function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/ _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return $('#btn-submit').prop('disabled', true);

                    case 2:
                        _context6.next = 4;
                        return $('#btn-submit').css('cursor', 'not-allowed');

                    case 4:
                        _context6.next = 6;
                        return $('#btn-submit').html(" <span class=\"spinner-grow spinner-grow-sm\" role=\"status\" aria-hidden=\"true\"></span>\n\t\tLoading...");

                    case 6:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6);
    }));

    return function requestPreLoader() {
        return _ref4.apply(this, arguments);
    };
}();

var requestPreLoaderRemove = /*#__PURE__*/ function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/ _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return $('#btn-submit').html("<i class=\"far fa-paper-plane\"></i> Send");

                    case 2:
                        _context7.next = 4;
                        return grecaptcha.reset();

                    case 4:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7);
    }));

    return function requestPreLoaderRemove() {
        return _ref5.apply(this, arguments);
    };
}();

/***/