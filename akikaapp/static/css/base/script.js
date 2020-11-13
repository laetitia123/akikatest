'use strict';

// Global components list
let components = {};

components.loaderCircle = {
    selector: '.page-loader-progress',
    script: './components/progress-circle/progress-circle.min.js',
    init: function (nodes) {
        nodes.forEach(function (node) {
            node.style.visibility = 'visible';

            let
                instance = new ProgressCircle({
                    node: node
                }),
                intervalId = setInterval(function () {
                    if (instance.params.angle < 355) {
                        let increment = (360 - instance.params.angle) * 0.07;
                        instance.render(instance.params.angle + increment);
                    } else {
                        clearInterval(intervalId);
                        instance.render(355);
                    }
                }, 20);

            window.addEventListener('components:ready', function () {
                clearInterval(intervalId);
                instance.render(360);
            });
        });
    }
};

components.pageReveal = {
    selector: '.page',
    init: function () {
        window.addEventListener('components:ready', function () {
            window.dispatchEvent(new Event('resize'));
            document.documentElement.classList.add('components-ready');

            setTimeout(function () {
                document.documentElement.classList.add('page-loaded');
            }, 500);
        }, { once: true });
    }
};

components.currentDevice = {
    selector: 'html',
    script: './components/current-device/current-device.min.js'
};

components.fontFivoSansModern = {
    selector: 'html',
    styles: './components/fivosansmodern/fivosansmodern.css'
};

components.fontAwesome = {
    selector: '[class*="fa-"]',
    styles: './components/font-awesome/font-awesome.css'
};

components.mdi = {
    selector: '[class*="mdi-"]',
    styles: './components/mdi/mdi.css'
};

components.accordion = {
    selector: '.accordion',
    styles: './components/accordion/accordion.css'
};

components.blogPost = {
    selector: '.blog-post',
    styles: './components/blog-post/blog-post.css'
};

components.blurb = {
    selector: '.blurb',
    styles: './components/blurb/blurb.css'
};

components.box = {
    selector: '.box',
    styles: './components/box/box.css'
};

components.button = {
    selector: '.btn',
    styles: './components/button/button.css'
};

components.comment = {
    selector: '.comment',
    styles: './components/comment/comment.css'
};

components.divider = {
    selector: '.divider',
    styles: './components/divider/divider.css'
};

components.footer = {
    selector: 'footer',
    styles: './components/footer/footer.css'
};

components.grid = {
    selector: '.container, .container-fluid, .row, [class*="col-"]',
    styles: './components/grid/grid.css'
};

components.icon = {
    selector: '.icon',
    styles: './components/icon/icon.css'
};

components.image = {
    selector: '.image',
    styles: './components/image/image.css'
};

components.infoList = {
    selector: '.info-list',
    styles: './components/info-list/info-list.css'
};

components.input = {
    selector: '.form-group, .input-group, .form-check, .custom-control, .form-control',
    styles: './components/input/input.css'
};

components.intro = {
    selector: '.intro',
    styles: './components/intro/intro.css'
};

components.link = {
    selector: '.link',
    styles: './components/link/link.css'
};

components.list = {
    selector: '.list',
    styles: [
        './components/list/list.css',
        './components/mdi/mdi.css'
    ]
};

components.logo = {
    selector: '.logo',
    styles: './components/logo/logo.css'
};

components.media = {
    selector: '.media',
    styles: './components/media/media.css'
};

components.section = {
    selector: 'section',
    styles: './components/section/section.css'
};

components.rdForm = {
    selector: '.rd-form',
    styles: './components/rd-form/rd-form.css'
};

components.rights = {
    selector: '.rights',
    styles: './components/rights/rights.css'
};

components.quote = {
    selector: '.quote',
    styles: './components/quote/quote.css'
};

components.person = {
    selector: '.person',
    styles: './components/person/person.css'
};

components.post = {
    selector: '.post',
    styles: './components/post/post.css'
};

components.postMeta = {
    selector: '.post-meta',
    styles: './components/post-meta/post-meta.css'
};

components.postShare = {
    selector: '.post-share',
    styles: './components/post-share/post-share.css'
};

components.section = {
    selector: 'section',
    styles: './components/section/section.css'
};

components.sectionIntro = {
    selector: '.section-intro',
    styles: './components/section-intro/section-intro.css'
};

components.snackbar = {
    selector: '.snackbar',
    styles: './components/snackbar/snackbar.css'
};

components.social = {
    selector: '.social',
    styles: './components/social/social.css'
};

components.tab = {
    selector: '.tab',
    styles: './components/tab/tab.css'
};

components.table = {
    selector: '.table',
    styles: './components/table/table.css'
};

components.thumbnail = {
    selector: '.thumbnail',
    styles: './components/thumbnail/thumbnail.css'
};

components.video = {
    selector: '.video',
    styles: './components/video/video.css'
};

components.widget = {
    selector: '.widget',
    styles: './components/widget/widget.css'
};

// Script components
components.animate = {
    selector: '[data-animate]',
    styles: './components/animate/animate.css',
    script: './components/current-device/current-device.min.js',
    init: function (nodes) {
        if (window.xMode || device.macos()) {
            nodes.forEach(function (node) {
                let params = parseJSON(node.getAttribute('data-animate'));
                node.classList.add('animated', params.class);
            });
        } else {
            let observer = new IntersectionObserver(function (entries) {
                let observer = this;

                entries.forEach(function (entry) {
                    let
                        node = entry.target,
                        params = parseJSON(node.getAttribute('data-animate'));

                    if (params.delay) node.style.animationDelay = params.delay;
                    if (params.duration) node.style.animationDuration = params.duration;

                    if (entry.isIntersecting) {
                        node.classList.add('animated', params.class);
                        observer.unobserve(node);
                    }
                });
            }, {
                threshold: .5
            });

            nodes.forEach(function (node) {
                observer.observe(node);
            });
        }
    }
};

components.countdown = {
    selector: '[ data-countdown ]',
    styles: './components/countdown/countdown.css',
    script: [
        './components/util/util.min.js',
        './components/progress-circle/progress-circle.min.js',
        './components/countdown/countdown.min.js'
    ],
    init: function (nodes) {
        nodes.forEach(function (node) {
            aCountdown(Object.assign({
                node: node,
                tick: 100
            }, parseJSON(node.getAttribute('data-countdown'))));
        })
    }
};

components.lightgallery = {
    selector: '[data-lightgallery]',
    styles: './components/lightgallery/lightgallery.css',
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/lightgallery/lightgallery.min.js',
        './components/util/util.min.js'
    ],
    init: function (nodes) {
        if (!window.xMode) {
            nodes.forEach(function (node) {
                node = $(node);
                let
                    defaults = {
                        thumbnail: true,
                        selector: '.lightgallery-item',
                        youtubePlayerParams: {
                            modestbranding: 1,
                            showinfo: 0,
                            rel: 0,
                            controls: 0
                        },
                        vimeoPlayerParams: {
                            byline: 0,
                            portrait: 0,
                            color: 'A90707'
                        }
                    },
                    options = parseJSON(node.attr('data-lightgallery'));

                node.lightGallery(Util.merge([defaults, options]));
            });
        }
    }
};

components.lottie = {
    selector: '.lottie',
    script: [
        './components/util/util.min.js',
        './components/lottie/lottie.min.js',
    ],
    init: function (nodes) {
        nodes.forEach(function (node) {
            let params = parseJSON(node.getAttribute('data-lottie'));
            let defaults = {
                container: node,
                renderer: 'svg',
                loop: true,
                autoplay: true
            };

            lottie.loadAnimation(
                Util.merge([defaults, params])
            );
        });
    }
};

components.multiswitch = {
    selector: '[data-multi-switch]',
    styles: './components/multiswitch/multiswitch.css',
    script: [
        './components/current-device/current-device.min.js',
        './components/multiswitch/multiswitch.js'
    ],
    dependencies: 'rdNavbar',
    init: function (nodes) {
        let click = device.ios() ? 'touchstart' : 'click';

        nodes.forEach(function (node) {
            if (node.tagName === 'A') {
                node.addEventListener(click, function (event) {
                    event.preventDefault();
                });
            }

            MultiSwitch(Object.assign({
                node: node,
                event: click,
            }, parseJSON(node.getAttribute('data-multi-switch'))));
        });
    }
};

components.multiswitchTargetSlide = {
    selector: '[data-multi-switch-target-slide]',
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/multiswitch/multiswitch.js'
    ],
    dependencies: 'multiswitch',
    init: function (nodes) {
        nodes.forEach(function (node) {
            let params = parseJSON(node.getAttribute('data-multi-switch-target-slide'));

            if (!node.multiSwitchTarget.groups.active.state) node.style.display = 'none';

            node.addEventListener('switch:active', function () {
                let $this = $(this);

                if (this.multiSwitchTarget.groups.active.state) {
                    $this.stop().slideDown(params);
                } else {
                    $this.stop().slideUp(params);
                }
            });
        });
    }
};

components.nav = {
    selector: '.nav',
    styles: [
        './components/nav/nav.css',
        './components/mdi/mdi.css'
    ],
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/bootstrap/js/popper.js',
        './components/bootstrap/js/bootstrap.min.js'
    ],
    init: function (nodes) {
        nodes.forEach(function (node) {
            $(node).on('click', function (event) {
                event.preventDefault();
                $(this).tab('show');
            });

            $(node).find('a[data-toggle="tab"]').on('shown.bs.tab', function () {
                window.dispatchEvent(new Event('resize'));
            });
        });
    }
};

components.owlCarousel = {
    selector: '.owl-carousel',
    styles: [
        './components/owl-carousel/owl.carousel.css',
        './components/mdi/mdi.css'
    ],
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/owl-carousel/owl.carousel.min.js',
        './components/util/util.min.js'
    ],
    init: function (nodes) {
        nodes.forEach(function (node) {
            let
                params = parseJSON(node.getAttribute('data-owl')),
                defaults = {
                    items: 1,
                    margin: 30,
                    loop: false,
                    mouseDrag: true,
                    stagePadding: 0,
                    nav: false,
                    navText: [],
                    dots: false,
                    //dotsEach: 2,
                    autoplay: false,
                    autoplayHoverPause: true
                },
                xMode = {
                    autoplay: false,
                    loop: false,
                    mouseDrag: false
                },
                generated = {
                    autoplay: node.getAttribute('data-autoplay') !== 'false',
                    loop: node.getAttribute('data-loop') !== 'false',
                    mouseDrag: node.getAttribute('data-mouse-drag') !== 'false',
                    responsive: {}
                },
                aliaces = ['-', '-xs-', '-sm-', '-md-', '-lg-', '-xl-', '-xxl-'],
                values = [0, 480, 576, 768, 992, 1200, 1600],
                responsive = generated.responsive;

            for (let j = 0; j < values.length; j++) {
                responsive[values[j]] = {};

                for (let k = j; k >= -1; k--) {
                    if (!responsive[values[j]]['items'] && node.getAttribute('data' + aliaces[k] + 'items')) {
                        responsive[values[j]]['items'] = k < 0 ? 1 : parseInt(node.getAttribute('data' + aliaces[k] + 'items'), 10);
                    }
                    if (!responsive[values[j]]['stagePadding'] && responsive[values[j]]['stagePadding'] !== 0 && node.getAttribute('data' + aliaces[k] + 'stage-padding')) {
                        responsive[values[j]]['stagePadding'] = k < 0 ? 0 : parseInt(node.getAttribute('data' + aliaces[k] + 'stage-padding'), 10);
                    }
                    if (!responsive[values[j]]['margin'] && responsive[values[j]]['margin'] !== 0 && node.getAttribute('data' + aliaces[k] + 'margin')) {
                        responsive[values[j]]['margin'] = k < 0 ? 30 : parseInt(node.getAttribute('data' + aliaces[k] + 'margin'), 10);
                    }
                }
            }

            node.owl = $(node);
            $(node).owlCarousel(Util.merge(window.xMode ? [defaults, params, generated, xMode] : [defaults, params, generated]));
        });
    }
};

components.regula = {
    selector: '[data-constraints]',
    styles: './components/regula/regula.css',
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/regula/regula.min.js'
    ],
    init: function (nodes) {
        let elements = $(nodes);

        // Custom validator - phone number
        regula.custom({
            name: 'PhoneNumber',
            defaultMessage: 'Invalid phone number format',
            validator: function () {
                if (this.value === '') return true;
                else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test(this.value);
            }
        });

        for (let i = 0; i < elements.length; i++) {
            let o = $(elements[i]), v;
            o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
            v = o.parent().find(".form-validation");
            if (v.is(":last-child")) o.addClass("form-control-last-child");
        }

        elements.on('input change propertychange blur', function (e) {
            let $this = $(this), results;

            if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
            if ($this.parents('.rd-mailform').hasClass('success')) return;

            if ((results = $this.regula('validate')).length) {
                for (let i = 0; i < results.length; i++) {
                    $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
                }
            } else {
                $this.siblings(".form-validation").text("").parent().removeClass("has-error")
            }
        }).regula('bind');

        let regularConstraintsMessages = [
            {
                type: regula.Constraint.Required,
                newMessage: "The text field is required."
            },
            {
                type: regula.Constraint.Email,
                newMessage: "The email is not a valid email."
            },
            {
                type: regula.Constraint.Numeric,
                newMessage: "Only numbers are required"
            },
            {
                type: regula.Constraint.Selected,
                newMessage: "Please choose an option."
            }
        ];


        for (let i = 0; i < regularConstraintsMessages.length; i++) {
            let regularConstraint = regularConstraintsMessages[i];

            regula.override({
                constraintType: regularConstraint.type,
                defaultMessage: regularConstraint.newMessage
            });
        }
    }
};

components.rdMailform = {
    selector: '.rd-mailform',
    styles: [
        './components/rd-mailform/rd-mailform.css',
        './components/font-awesome/font-awesome.css'
    ],
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/rd-mailform/rd-mailform.min.js',
    ],
    init: function (nodes) {
        let i, j, k,
            $captchas = $(nodes).find('.recaptcha'),
            msg = {
                'MF000': 'Successfully sent!',
                'MF001': 'Recipients are not set!',
                'MF002': 'Form will not work locally!',
                'MF003': 'Please, define email field in your form!',
                'MF004': 'Please, define type of your form!',
                'MF254': 'Something went wrong with PHPMailer!',
                'MF255': 'Aw, snap! Something went wrong.'
            };

        if ($captchas.length) {
            $.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
        }

        /**
         * @desc Check if all elements pass validation
         * @param {object} elements - object of items for validation
         * @param {object} captcha - captcha object for validation
         * @return {boolean}
         */
        function isValidated(elements, captcha) {
            let results, errors = 0;

            if (elements.length) {
                for (let j = 0; j < elements.length; j++) {

                    let $input = $(elements[j]);
                    if ((results = $input.regula('validate')).length) {
                        for (k = 0; k < results.length; k++) {
                            errors++;
                            $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                        }
                    } else {
                        $input.siblings(".form-validation").text("").parent().removeClass("has-error")
                    }
                }

                if (captcha) {
                    if (captcha.length) {
                        return validateReCaptcha(captcha) && errors === 0
                    }
                }

                return errors === 0;
            }
            return true;
        }

        /**
         * @desc Validate google reCaptcha
         * @param {object} captcha - captcha object for validation
         * @return {boolean}
         */
        function validateReCaptcha(captcha) {
            let captchaToken = captcha.find('.g-recaptcha-response').val();

            if (captchaToken.length === 0) {
                captcha
                    .siblings('.form-validation')
                    .html('Please, prove that you are not robot.')
                    .addClass('active');
                captcha
                    .closest('.form-wrap')
                    .addClass('has-error');

                captcha.on('propertychange', function () {
                    let $this = $(this),
                        captchaToken = $this.find('.g-recaptcha-response').val();

                    if (captchaToken.length > 0) {
                        $this
                            .closest('.form-wrap')
                            .removeClass('has-error');
                        $this
                            .siblings('.form-validation')
                            .removeClass('active')
                            .html('');
                        $this.off('propertychange');
                    }
                });

                return false;
            }

            return true;
        }

        /**
         * @desc Initialize Google reCaptcha
         */
        window.onloadCaptchaCallback = function () {
            for (let i = 0; i < $captchas.length; i++) {
                let
                    $captcha = $($captchas[i]),
                    resizeHandler = (function () {
                        let
                            frame = this.querySelector('iframe'),
                            inner = this.firstElementChild,
                            inner2 = inner.firstElementChild,
                            containerRect = null,
                            frameRect = null,
                            scale = null;

                        inner2.style.transform = '';
                        inner.style.height = 'auto';
                        inner.style.width = 'auto';

                        containerRect = this.getBoundingClientRect();
                        frameRect = frame.getBoundingClientRect();
                        scale = containerRect.width / frameRect.width;

                        if (scale < 1) {
                            inner2.style.transform = 'scale(' + scale + ')';
                            inner2.style.transformOrigin = 'top left';
                            inner.style.height = (frameRect.height * scale) + 'px';
                            inner.style.width = (frameRect.width * scale) + 'px';
                        }
                    }).bind($captchas[i]);

                grecaptcha.render(
                    $captcha.attr('id'),
                    {
                        sitekey: $captcha.attr('data-sitekey'),
                        size: $captcha.attr('data-size') ? $captcha.attr('data-size') : 'normal',
                        theme: $captcha.attr('data-theme') ? $captcha.attr('data-theme') : 'light',
                        callback: function () {
                            $('.recaptcha').trigger('propertychange');
                        }
                    }
                );

                $captcha.after("<span class='form-validation'></span>");

                if ($captchas[i].hasAttribute('data-auto-size')) {
                    resizeHandler();
                    window.addEventListener('resize', resizeHandler);
                }
            }
        };

        for (i = 0; i < nodes.length; i++) {
            let
                $form = $(nodes[i]),
                formHasCaptcha = false;

            $form.attr('novalidate', 'novalidate').ajaxForm({
                data: {
                    "form-type": $form.attr("data-form-type") || "contact",
                    "counter": i
                },
                beforeSubmit: function (arr, $form, options) {
                    if (window.xMode) return;

                    let
                        form = $(nodes[this.extraData.counter]),
                        inputs = form.find("[data-constraints]"),
                        output = $("#" + form.attr("data-form-output")),
                        captcha = form.find('.recaptcha'),
                        captchaFlag = true;

                    output.removeClass("active error success");

                    if (isValidated(inputs, captcha)) {

                        // veify reCaptcha
                        if (captcha.length) {
                            let captchaToken = captcha.find('.g-recaptcha-response').val(),
                                captchaMsg = {
                                    'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
                                    'CPT002': 'Something wrong with google reCaptcha'
                                };

                            formHasCaptcha = true;

                            $.ajax({
                                method: "POST",
                                url: "components/rd-mailform/reCaptcha.php",
                                data: { 'g-recaptcha-response': captchaToken },
                                async: false
                            })
                                .done(function (responceCode) {
                                    if (responceCode !== 'CPT000') {
                                        if (output.hasClass("snackbar")) {
                                            output.html('<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon fa-check"></span>' + captchaMsg[responceCode] + '</div></div>');

                                            setTimeout(function () {
                                                output.removeClass("active");
                                            }, 3500);

                                            captchaFlag = false;
                                        } else {
                                            output.html(captchaMsg[responceCode]);
                                        }

                                        output.addClass("active");
                                    }
                                });
                        }

                        if (!captchaFlag) {
                            return false;
                        }

                        form.addClass('form-in-process');

                        if (output.hasClass("snackbar")) {
                            output.html('<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon fa-circle-o-notch fa-spin"></span>Sending</div></div>');
                            output.addClass("active");
                        }
                    } else {
                        return false;
                    }
                },
                error: function (result) {
                    if (window.xMode) return;

                    let
                        output = $("#" + $(nodes[this.extraData.counter]).attr("data-form-output")),
                        form = $(nodes[this.extraData.counter]);

                    output.text(msg[result]);
                    form.removeClass('form-in-process');

                    if (formHasCaptcha) {
                        grecaptcha.reset();
                    }
                },
                success: function (result) {
                    if (window.xMode) return;

                    let
                        form = $(nodes[this.extraData.counter]),
                        output = $("#" + form.attr("data-form-output")),
                        select = form.find('select');

                    form
                        .addClass('success')
                        .removeClass('form-in-process');

                    if (formHasCaptcha) {
                        grecaptcha.reset();
                    }

                    result = result.length === 5 ? result : 'MF255';
                    output.text(msg[result]);

                    if (result === "MF000") {
                        if (output.hasClass("snackbar")) {
                            output.html('<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon fa-check"></span>' + msg[result] + '</div></div>');
                        } else {
                            output.addClass("active success");
                        }
                    } else {
                        if (output.hasClass("snackbar")) {
                            output.html('<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon fa-exclamation-triangle"></span>' + msg[result] + '</div></div>');
                        } else {
                            output.addClass("active error");
                        }
                    }

                    form.clearForm();

                    if (select.length) {
                        select.select2("val", "");
                    }

                    form.find('input, textarea').trigger('blur');

                    setTimeout(function () {
                        output.removeClass("active error success");
                        form.removeClass('success');
                    }, 3500);
                }
            });
        }
    }
};

components.rdNavbar = {
    selector: '.rd-navbar',
    styles: [
        './components/rd-navbar/rd-navbar.css'
    ],
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/util/util.min.js',
        './components/current-device/current-device.min.js',
        './components/rd-navbar/rd-navbar.min.js'
    ],
    dependencies: 'currentDevice',
    init: function (nodes) {
        let promises = [];

        nodes.forEach(function (node) {
            promises.push(new Promise(function (resolve) {
                let
                    backButtons = node.querySelectorAll('.navbar-navigation-back-btn'),
                    params = parseJSON(node.getAttribute('data-rd-navbar')),
                    defaults = {
                        stickUpClone: false,
                        anchorNav: false,
                        autoHeight: false,
                        stickUpOffset: '1px',
                        responsive: {
                            0: {
                                layout: 'rd-navbar-fixed',
                                deviceLayout: 'rd-navbar-fixed',
                                focusOnHover: 'ontouchstart' in window,
                                stickUp: false
                            },
                            992: {
                                layout: 'rd-navbar-fixed',
                                deviceLayout: 'rd-navbar-fixed',
                                focusOnHover: 'ontouchstart' in window,
                                stickUp: false
                            },
                            1200: {
                                layout: 'rd-navbar-fullwidth',
                                deviceLayout: 'rd-navbar-fullwidth',
                                stickUp: true,
                                stickUpOffset: '1px',
                                autoHeight: true
                            }
                        },
                        callbacks: {
                            onStuck: function () {
                                document.documentElement.classList.add('rd-navbar-stuck');
                            },
                            onUnstuck: function () {
                                document.documentElement.classList.remove('rd-navbar-stuck');
                            },
                            onDropdownToggle: function () {
                                if (this.classList.contains('opened')) {
                                    this.parentElement.classList.add('overlaid');
                                } else {
                                    this.parentElement.classList.remove('overlaid');
                                }
                            },
                            onDropdownClose: function () {
                                this.parentElement.classList.remove('overlaid');
                            },
                            onDomAppend: function () {
                                resolve()
                            }
                        }
                    },
                    xMode = {
                        stickUpClone: false,
                        anchorNav: false,
                        responsive: {
                            0: {
                                stickUp: false,
                                stickUpClone: false
                            },
                            992: {
                                stickUp: false,
                                stickUpClone: false
                            },
                            1200: {
                                stickUp: false,
                                stickUpClone: false
                            }
                        },
                        callbacks: {
                            onDropdownOver: function () { return false; }
                        }
                    },
                    navbar = node.RDNavbar = new RDNavbar(node, Util.merge(window.xMode ? [defaults, params, xMode] : [defaults, params]));

                if (backButtons.length) {
                    backButtons.forEach(function (btn) {
                        btn.addEventListener('click', function () {
                            let
                                submenu = this.closest('.rd-navbar-submenu'),
                                parentmenu = submenu.parentElement;

                            navbar.dropdownToggle.call(submenu, navbar);
                        });
                    });
                }
            }));
        });

        return Promise.all(promises);
    }
};

components.particles = {
    selector: '.particles',
    styles: [
        './components/particles/particles.css'
    ],
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/util/util.min.js',
        './components/particles/particles.min.js'
    ],
    init: function (nodes) {
        nodes.forEach(function (node) {
            particlesJS.load('particles', 'components/particles/particles.json');
        });
    }
};

components.select2 = {
    selector: '.select2',
    styles: './components/select2/select2.css',
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/select2/select2.min.js'
    ],
    init: function (nodes) {
        return new Promise(function (resolve) {
            nodes.forEach(function (node) {
                let
                    params = parseJSON(node.getAttribute('data-select2-options')),
                    defaults = {
                        dropdownParent: $('.page'),
                        minimumResultsForSearch: Infinity
                    };

                $(node).select2($.extend(defaults, params));
            });

            resolve();
        });
    }
};

components.toTop = {
    selector: 'html',
    styles: './components/to-top/to-top.css',
    script: './components/jquery/jquery-3.4.1.min.js',
    init: function () {
        if (!window.xMode) {
            let node = document.createElement('div');
            node.className = 'to-top mdi-chevron-up';
            document.body.appendChild(node);

            node.addEventListener('mousedown', function () {
                this.classList.add('active');

                $('html, body').stop().animate({ scrollTop: 0 }, 500, 'swing', (function () {
                    this.classList.remove('active');
                }).bind(this));
            });

            document.addEventListener('scroll', function () {
                if (window.scrollY > window.innerHeight) node.classList.add('show');
                else node.classList.remove('show');
            });
        }
    }
};

// Statistic components
components.stats = {
    selector: '[data-stats]',
    init: function (nodes) {
        let
            stats,
            hist;

        // See https://corona.lmao.ninja/docs
        return Promise.all([
            request('https://corona.lmao.ninja/v2/countries').then(function (text) {
                return new Promise(function (resolve) {
                    stats = JSON.parse(text);
                    resolve();
                });
            }).then(function () {
                return request('https://corona.lmao.ninja/v2/all');
            }).then(function (text) {
                return new Promise(function (resolve) {
                    stats.push(JSON.parse(text));

                    // Sort data by cases number
                    stats.sort(function (a, b) { return b.cases - a.cases; });

                    // Generate data object
                    window.stats = Object.fromEntries(stats.map(function (item) {
                        if (item.countryInfo) {
                            return [item.countryInfo.iso3, item];
                        } else {
                            return ['ALL', item];
                        }
                    }));

                    resolve();
                });
            }),

            request('https://corona.lmao.ninja/v2/historical').then(function (text) {
                return new Promise(function (resolve) {
                    hist = JSON.parse(text);
                    resolve();
                });
            }).then(function () {
                return request('https://corona.lmao.ninja/v2/historical/all');
            }).then(function (text) {
                return new Promise(function (resolve) {
                    hist.unshift(JSON.parse(text));

                    // Generate data object
                    window.historical = Object.fromEntries(hist.map(function (item) {
                        if (item.country && item.province) {
                            return [item.country + ' - ' + item.province, item];
                        } else if (item.country) {
                            return [item.country, item];
                        } else {
                            return ['ALL', item];
                        }
                    }));

                    resolve();
                });
            })
        ]).then(function () {
            return new Promise(function (resolve) {
                resolve();
                let event = new CustomEvent('statsupd');
                event.data = window.stats['ALL'];

                nodes.forEach(function (node) {
                    node.dispatchEvent(event);
                });
            });
        });
    }
};

components.pieChart = {
    selector: '[data-pie-chart]',
    styles: './components/flotchart/flotchart.css',
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/flotchart/jquery.canvaswrapper.js',
        './components/flotchart/jquery.colorhelpers.js',
        './components/flotchart/jquery.flot.js',
        './components/flotchart/jquery.flot.saturated.js',
        './components/flotchart/jquery.flot.browser.js',
        './components/flotchart/jquery.flot.drawSeries.js',
        './components/flotchart/jquery.flot.uiConstants.js',
        './components/flotchart/jquery.flot.resize.js',
        './components/flotchart/jquery.flot.hover.js',
        './components/flotchart/jquery.flot.legend.js',
        './components/flotchart/jquery.flot.pie.js'
    ],
    dependencies: 'stats',
    init: function (nodes) {
        if (!window.stats) {
            throw new Error('window.stats is undefined, check for the presence of a statistics component or establish the correct dependency.');
        }

        function scores(int) {
            let m = int / 1000000, k = int / 1000;
            if (m >= 1 || k >= 500) return m.toFixed(1) + 'm';
            else if (k >= 1) return k.toFixed() + 'k';
            return int + '';
        }

        let data = [
            ['cases', '#fc7b3b'],
            ['recovered', '#34b3b1'],
            ['deaths', '#8c3999']
        ].map(function (item) {
            return { label: item[0], data: window.stats['ALL'][item[0]], color: item[1] };
        });

        nodes.forEach(function (node) {
            let
                defaults = {
                    series: {
                        pie: {
                            show: true,
                            label: {
                                formatter: function (val, params) {
                                    return '<div style="color:' + params.color + ';">' + scores(params.data[0][1]) + '</div>';
                                }
                            }
                        }
                    },
                    grid: {
                        hoverable: true
                    }
                },
                params = parseJSON(node.getAttribute('data-pie-chart'));

            $.plot($(node), data, merge(defaults, params));
        });
    }
};

components.chart = {
    selector: '[data-chart]',
    styles: './components/flotchart/flotchart.css',
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/flotchart/jquery.canvaswrapper.js',
        './components/flotchart/jquery.colorhelpers.js',
        './components/flotchart/jquery.flot.js',
        './components/flotchart/jquery.flot.saturated.js',
        './components/flotchart/jquery.flot.browser.js',
        './components/flotchart/jquery.flot.drawSeries.js',
        './components/flotchart/jquery.flot.uiConstants.js',
        './components/flotchart/jquery.flot.resize.js',
        './components/flotchart/jquery.flot.hover.js',
        './components/flotchart/jquery.flot.symbol.js',
        './components/flotchart/jquery.flot.time.js'
    ],
    dependencies: 'stats',
    init: function (nodes) {
        function pad(num, size) {
            let s = num + '';
            while (s.length < size) s = '0' + s;
            return s;
        }

        function convertDate(str) {
            let date = str.match(/(\d{1,2})\/(\d{1,2})\/(\d{1,2})/);
            return new Date(['20' + date[3], pad(date[1], 2), pad(date[2], 2)].join('-'));
        }

        function genData(label, data, color) {
            return {
                label: label,
                lines: {
                    show: true,
                    lineWidth: 3
                },
                points: {
                    show: false,
                    symbol: 'custom',
                    radius: 3,
                    fill: true,
                    fillColor: color
                },
                color: color,
                data: Object.keys(data).map(function (item) {
                    return [convertDate(item), data[item]];
                })
            };
        }

        return new Promise(function (resolve) {
            let
                data = {},
                options = {
                    grid: {
                        show: true,
                        aboveData: true,
                        color: '#dadada',
                        clickable: true,
                        hoverable: true,
                        borderWidth: {
                            left: 1,
                            top: 0,
                            right: 0,
                            bottom: 0
                        }
                    },
                    xaxis: {
                        color: 'transparent',
                        mode: "time",
                        timeformat: "%Y/%m/%d",
                        font: {
                            size: 15
                        }
                    },
                    yaxis: {
                        color: 'transparent',
                        autoscale: 'loose',
                        autoScaleMargin: 0.1,
                        font: {
                            size: 15
                        }
                    }
                };

            for (let key in window.historical) {
                let item = window.historical[key];

                if (item.country) {
                    data[key] = [
                        genData('Cases', item.timeline.cases, '#8c3999'),
                        genData('Deaths', item.timeline.deaths, '#fc7b3b'),
                        genData('Recovered', item.timeline.recovered, '#34b3b1')
                    ];
                } else {
                    data['ALL'] = [
                        genData('Cases', item.cases, '#8c3999'),
                        genData('Deaths', item.deaths, '#fc7b3b'),
                        genData('Recovered', item.recovered, '#34b3b1')
                    ];
                }
            }

            nodes.forEach(function (node) {
                node.data = data;
                node.plot = $.plot(
                    $(node),
                    data['ALL'],
                    JSON.parse(node.getAttribute('data-flotchart-options')) || options
                );

                let tooltip = document.createElement('div');
                tooltip.className = 'flotchart-tooltip';
                tooltip.style.position = 'absolute';
                tooltip.style.transform = 'translate( -50%, calc( -100% - 18px) )';
                tooltip.style.display = 'none';
                document.body.appendChild(tooltip);

                $(node).bind('plothover', function (event, pos, item) {
                    if (pos.x && pos.y && item) {
                        tooltip.style.display = 'block';
                        tooltip.style.top = item.pageY + 'px';
                        tooltip.style.left = item.pageX + 'px';
                        tooltip.innerHTML = '<h5>' + item.series.data[item.dataIndex][0].toLocaleDateString() + '</h5><div class="flotTipData"><span>' + item.series.label + ':</span><span class="flotTipY">' + new Intl.NumberFormat('en-US').format(item.datapoint[1]) + '</span></div>';
                    } else {
                        tooltip.style.display = 'none';
                    }
                });
            });

            resolve();
        });
    }
};

components.chartSelect = {
    selector: '[data-chart-select]',
    stript: './components/jquery/jquery-3.4.1.min.js',
    dependencies: ['chart', 'select2'],
    init: function (nodes) {
        nodes.forEach(function (node) {
            let
                target = document.querySelector(node.getAttribute('data-chart-select')),
                data = target.data,
                handler = function () {
                    target.plot.setData(data[this.value]);
                    target.plot.setupGrid(true);
                    target.plot.draw();
                };

            // Generate options
            for (let key in data) {
                let opt = document.createElement('option');
                opt.setAttribute('val', key);
                opt.innerText = key;
                node.appendChild(opt);
            }

            $(node).on('change', handler);
        })
    }
};

components.jvectorMap = {
    selector: '.jvector-map-wrap',
    styles: './components/jvector-map/jvector-map.css',
    script: [
        './components/jquery/jquery-3.4.1.min.js',
        './components/jvector-map/jvector-map.min.js',
        './components/jvector-map/assets/world-mill.js'
    ],
    dependencies: 'stats',
    init: function (nodes) {
        return new Promise(function (resolve) {
            nodes.forEach(function (container) {
                let
                    series = {},
                    defaults = {
                        container: $(container).find('.jvector-map-body'),
                        map: 'world_mill',
                        regionsSelectable: false,
                        regionsSelectableOne: false,
                        markersSelectable: true,
                        markersSelectableOne: true,
                        markers: {},
                        markerStyle: {
                            initial: {
                                fill: '#fc7b3b',
                                'stroke-width': 0
                            },
                            hover: {
                                fill: '#34b3b1',
                                'stroke-width': 0
                            },
                            selected: {
                                fill: '#8c3999',
                                'stroke-width': 0
                            }
                        },
                        series: {
                            markers: [{
                                attribute: 'r',
                                scale: [3, 20],
                                values: series
                            }]
                        },
                        onMarkerSelected: function (e, code) {
                            let event = new CustomEvent('statsupd');
                            event.data = window.stats[code];
                            container.dispatchEvent(event);
                        }
                    },
                    params = parseJSON(container.getAttribute('data-jvector-map')),
                    stats = window.stats;

                // Generate markers
                for (let key in stats) {
                    let item = stats[key];
                    if (item.countryInfo) {
                        series[item.countryInfo.iso3] = item.cases;
                        defaults.markers[item.countryInfo.iso3] = { latLng: [item.countryInfo.lat, item.countryInfo.long], name: item.country, r: 10 };
                    }
                }

                let
                    map = container.jvm = new jvm.Map(merge(defaults, params)),
                    event = new CustomEvent('statsupd');

                event.data = stats['ALL'];
                container.dispatchEvent(event);
            });

            resolve();
        });
    }
};

components.statsHandler = {
    selector: '[data-stats-handler]',
    init: function (nodes) {
        nodes.forEach(function (node) {
            let params = parseJSON(node.getAttribute('data-stats-handler'));
            params.targets = document.querySelectorAll(params.targets);

            params.targets.forEach(function (target) {
                target.addEventListener('statsupd', function (event) {
                    node.innerText = new Intl.NumberFormat('en-US').format(event.data[params.key]);
                });
            });
        });
    }
};

components.statsSelect = {
    selector: '.select',
    styles: './components/select/select.css',
    script: [
        './components/current-device/current-device.min.js',
        './components/jquery/jquery-3.4.1.min.js',
        './components/multiswitch/multiswitch.js'
    ],
    dependencies: 'stats',
    init: function (nodes) {
        let
            click = device.ios() ? 'touchstart' : 'click',
            target = document.querySelector('[data-stats]');

        nodes.forEach(function (node) {
            let
                head = node.querySelector('.select-title'),
                body = node.querySelector('.select-body'),
                items = node.querySelectorAll('.select-item');

            // Init MultiSwitch
            MultiSwitch({
                node: head,
                targets: [node, body],
                scope: [node],
                event: click,
            });

            // Add smooth opening/closing
            if (!body.multiSwitchTarget.groups.active.state) body.style.display = 'none';
            body.addEventListener('switch:active', function () {
                let $this = $(this);
                if (this.multiSwitchTarget.groups.active.state) {
                    $this.stop().slideDown();
                } else {
                    $this.stop().slideUp();
                }
            });

            // Throw error if statistics not received
            if (!window.stats) {
                // Add items click handlers
                items.forEach(function (item) {
                    item.addEventListener('click', function (event) {
                        event.preventDefault();
                    })
                });

                throw new Error('window.stats is undefined, check for the presence of a statistics component or establish the correct dependency.');
            } else {
                // Add items click handlers
                items.forEach(function (item) {
                    item.addEventListener('click', function (event) {
                        event.preventDefault();
                        let newEvent = new CustomEvent('statsupd');
                        newEvent.data = window.stats[this.getAttribute('href')];
                        target.dispatchEvent(newEvent);
                    })
                });
            }
        })
    }
};

components.casesList = {
    selector: '#cases-list',
    dependencies: 'jvectorMap',
    init: function (nodes) {
        nodes.forEach(function (node) {
            let
                target = document.querySelector(node.getAttribute('data-map')),
                stats = window.stats,
                jvm = target.jvm;

            // Proceed stats data
            for (let key in stats) {
                let
                    data = stats[key],
                    item = document.createElement('tr');

                item.innerHTML = '<td><a class="link link-dark" href="#">' + (data.country || key) + '</a></td><td>' + new Intl.NumberFormat('en-US').format(data.cases) + '</td>';
                node.appendChild(item);

                item.querySelector('a').addEventListener('click', function (event) {
                    event.preventDefault();
                    let selected = Object.fromEntries(jvm.getSelectedMarkers().map(function (item) { return [item, false]; }));
                    if (data.countryInfo) {
                        selected[data.countryInfo.iso3] = true;
                        jvm.setSelectedMarkers(selected);
                    } else {
                        jvm.setSelectedMarkers(selected);
                        let event = new CustomEvent('statsupd');
                        event.data = stats['ALL'];
                        target.dispatchEvent(event);
                    }
                });
            }
        });
    }
};


/**
 * Get tag of passed data
 * @param {*} data
 * @return {string}
 */
function objectTag(data) {
    return Object.prototype.toString.call(data).slice(8, -1);
}

/**
 * Wrapper to eliminate json errors
 * @param {string} str - JSON string
 * @returns {object} - parsed or empty object
 */
function parseJSON(str) {
    try {
        if (str) return JSON.parse(str);
        else return {};
    } catch (error) {
        return {};
    }
}

/**
 * Merging of two objects
 * @param {Object} source
 * @param {Object} merged
 * @return {Object}
 */
function merge(source, merged) {
    for (let key in merged) {
        let tag = objectTag(merged[key]);

        if (tag === 'Object') {
            if (typeof (source[key]) !== 'object') source[key] = {};
            source[key] = merge(source[key], merged[key]);
        } else if (tag !== 'Null') {
            source[key] = merged[key];
        }
    }

    return source;
}

/**
 * Загрузка данных по заданному адресу и их обработка с помощью функции обратного вызова.
 * @param {string} req - адрес запроса
 * @param {function} [cb] - функция обратного вызова, которая получает строку содержимого файла
 */
function request(req, cb) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('GET', req, true);
        request.send(null);
        request.onload = function () {
            if (request.readyState === 4 && request.status === 200) {
                if (cb instanceof Function) cb(request.responseText);
                resolve(request.responseText);
            } else {
                reject({ request: req, state: request.readyState, status: request.status });
            }
        };
    });
}


// Main
window.addEventListener('load', function () {
    new ZemezCore({
        components: components,
        observeDOM: window.xMode,
        IEPolyfill: './components/base/support.js'
    });
});
