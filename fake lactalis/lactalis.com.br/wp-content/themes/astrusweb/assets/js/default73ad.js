var SITE = $('meta[name=host]').attr("content");
var FLAG_COUNTER = false;
var prod_slider;
var pager_slider;
var controller = new ScrollMagic.Controller({vertical: true});

$('.cpf_input').mask('999.999.999-99');
$('.cnpj_input, input[name="cnpj_loj"]').mask('99.999.999/9999-99');
$('.cep_input, input[name=cep_loj]').mask('99999-999');
$('.data_input').mask('99/99/9999');
$('.time_input').mask('99:99');
$('.mascara_telefone, input[placeholder="telefone"]').mask('(99) 99999-9999');
$('#telefone').mask('(99) 99999-9999');

$('#fale-com-lactalis .show-more').click(function(){
    $('#fale-com-lactalis .bottomside .listduvidas .item.disable').removeClass('disable');
    $(this).remove();
});

$('input[name=attachment-curriculo]').change(function(){
    var file = $(this).val().split(/\\/);
    $('form .attachment-file .info').html(file[file.length - 1]);
    // $('.namefile').html('<input class="namefile" type="hidden" name="filename" value="<?= $url; ?>">');
});
$('#nossahistoria h2').each(function() {
    var html = $(this).html().split(" ");
    html = html.slice(0, -1).join(" ") + " <b>" + html.pop() + " <b>";
    $(this).html(html);
});
$('#blog .itens .item').click(function(){
    var linkto = $(this).find('a').attr("href");
    window.location.href = linkto;
});
$( document ).ready(function() {
    news();

    load_cities_by_state();
    read_more_comunicados();
    trabalhe_conosco();

    contato();
    faleconosco();
    sejaprodutor();

    // OWL CAROUSEL BANNERS HOME
    $('.banner-owl').owlCarousel({
        items:1,
        autoplay: true,
        autoplayHoverPause:false,
        autoplayTimeout: 5000,
        smartSpeed: 1500,
        loop:true,
        responsive : {
            0 : {
                items : 1
            },
            768 : {
                items : 1
            },
            979 : {
                items : 1
            }
        }
    });
    var owlgal = $(".galery");
    owlgal.owlCarousel({
        items:1,
        autoplay: true,
        autoplayHoverPause:false,
        autoplayTimeout: 5000,
        smartSpeed: 1500,
        loop:true,
        startPosition: 'center',
        onChanged: function(e){
            if ( e.item.count >= (e.item.index + 1) ) {
                $('.next').removeClass('disabled');
                $('.prev').removeClass('disabled');
                // if ( (e.item.index) == 0 ) {
                //   $('.prev').addClass('disabled');
                // }
                // if ( (e.item.index + 1) == e.item.count) {
                //   $('.next').addClass('disabled');
                // }
            }
        },
        responsive : {
            0 : {
                items : 1
            },
            768 : {
                items : 3
            },
            979 : {
                items : 3
            },
            1050 : {
                items : 3
            },
            1060 : {
                items : 1
            }
        }
    });

    var owlrev = $(".revistas");
    owlrev.owlCarousel({
        items:5,
        autoplay: false,
        autoplayHoverPause:false,
        autoplayTimeout: 5000,
        smartSpeed: 1500,
        loop:false,
        startPosition: 'center',
        onChanged: function(e){
            if ( e.item.count >= (e.item.index + 1) ) {
                $('.next').removeClass('disabled');
                $('.prev').removeClass('disabled');
                if ( (e.item.index) == 0 ) {
                  $('.prev').addClass('disabled');
                }
                if ( (e.item.index + 1) == e.item.count) {
                  $('.next').addClass('disabled');
                }
            }
        },
        responsive : {
            0 : {
                items : 5
            },
            768 : {
                items : 5
            },
            979 : {
                items : 5
            }
        }
    });
    $(document).on("click", ".next", function() {
        owlrev.trigger('next.owl.carousel');
    });
    $(document).on("click", ".prev", function() {
        owlrev.trigger('prev.owl.carousel');
    });

    var owlrev22 = $("#marcas .itens");
    owlrev22.owlCarousel({
        items:5,
        autoplay: true,
        autoplayHoverPause:false,
        autoplayTimeout: 5000,
        smartSpeed: 1500,
        loop:true,
        startPosition: 'center',
        onChanged: function(e){
            if ( e.item.count >= (e.item.index + 1) ) {
                $('.next2').removeClass('disabled');
                $('.prev2').removeClass('disabled');
                if ( (e.item.index) == 0 ) {
                  $('.prev2').addClass('disabled');
                }
                if ( (e.item.index + 1) == e.item.count) {
                  $('.next2').addClass('disabled');
                }
            }
        },
        responsive : {
            0 : {
                items : 2
            },
            768 : {
                items : 3
            },
            979 : {
                items : 5
            }
        }
    });

    $(document).on("click", ".next2", function() {
        owlrev22.trigger('next.owl.carousel');
    });
    $(document).on("click", ".prev2", function() {
        owlrev22.trigger('prev.owl.carousel');
    });

    // var owl = $(".gal-locales");
    // owl.owlCarousel({
    //     items:1,
    //     responsive : {
    //         0 : {
    //             items : 1
    //         },
    //         768 : {
    //             items : 1
    //         },
    //         979 : {
    //             items : 1
    //         }
    //     }
    // });
    if($(window).width() < 768) {
        var owl = $(".section-home#marcas .itens");
        owl.owlCarousel({
            items:3,
            responsive : {
                0 : {
                    items : 3
                },
                768 : {
                    items : 3
                },
                979 : {
                    items : 3
                }
            }
        });
        var owl = $(".section-home#blog .itens");
        owl.owlCarousel({
            items:1,
            responsive : {
                0 : {
                    items : 1
                },
                768 : {
                    items : 1
                },
                979 : {
                    items : 1
                }
            }
        });
    }

    if($(window).width() >= 980){
        var tween = new TimelineMax ()
        .add([
            TweenMax.fromTo($(".section-home#clube-do-produtor .content .text-img img"), 1, {scale: '0.8'}, {scale: '1' ,  ease: Linear.easeOut})
        ]);
        var scene = new ScrollMagic.Scene({triggerElement: $('.section-home#clube-do-produtor'),triggerHook: 'onEnter', offset: 203, duration: 1200})
        .setTween(tween)
        .addTo(controller);


        var tween = new TimelineMax ()
        .add([
            TweenMax.fromTo($(".section-home#galeria .galery .item-galery .imgseffect"), 1, {scale: '0.8'}, {scale: '1' ,  ease: Linear.easeOut})
        ]);
        var scene = new ScrollMagic.Scene({triggerElement: $('.section-home#galeria'),triggerHook: 'onEnter', offset: 203, duration: 1200})
        .setTween(tween)
        .addTo(controller);
        var timedelay = 400;
        $("#nossa-historia .time-line .item").each(function(i , index) {
            setTimeout(function () {
                $(index).addClass('showitem');
            }, timedelay);
            timedelay = timedelay + 400;
        });
    }

    // Custom Navigation Events
    $(document).on("click", ".next", function() {
        owlgal.trigger('next.owl.carousel');
    });
    $(document).on("click", ".prev", function() {
        owlgal.trigger('prev.owl.carousel');
    });
    $(document).on("click", ".next", function() {
        owl.trigger('next.owl.carousel');
    });
    $(document).on("click", ".prev", function() {
        owl.trigger('prev.owl.carousel');
    });
    $(document).on("click", ".next", function() {
        owlrev.trigger('next.owl.carousel');
    });
    $(document).on("click", ".prev", function() {
        owlrev.trigger('prev.owl.carousel');
    });

    $('.menufilter-nav .close').click(function(){
        $('.menufilter-nav').removeClass("active");
    });
    $('#abrirfiltro').click(function(){
        $('.menufilter-nav').addClass("active");
    });

    $('.pushy .hamb , .pushymain .hambmain').click(function(){
        $('.responsive-nav').addClass('active');
    });
    $('.responsive-nav .centerli .close').click(function(){
        $('.responsive-nav').removeClass('active');
    });

    $('.responsive-nav .centerli .openlist').click(function(){
        $(this).parent().toggleClass('active');
    });

    $(".square .points").click(function(){
        $('.square .circles').removeClass('active');
        $(this).parent().find('.circles').addClass('active');
    });
    $(".square .circles .pcircle .close").click(function(){
        $('.square .circles').removeClass('active');
    });

    $('#produtos .sides .right-side .item').click(function(){
        var id = $(this).attr('id');
        $('#popupprod .item.' + id).addClass('active');
        $('#popupprod').addClass('active');
    });

    $('#popupprod .voltar, #popupprod .close').click(function(){
        $('#popupprod .item').removeClass('active');
        $('#popupprod').removeClass('active');
    });

    
    $('#novidades-page .item').click(function(){
        var id = $(this).attr('id');
        $('#popupnovidade .item.' + id).addClass('active');
        $('#popupnovidade').addClass('active');
    });

    $('#popupnovidade .voltar, #popupnovidade .close').click(function(){
        $('#popupnovidade .item').removeClass('active');
        $('#popupnovidade').removeClass('active');
    });

    $('.infosadd .topside .ing-l').click(function(){
        $('.infosadd .topside>div').removeClass('active');
        $('.infosadd .bottomside >div').removeClass('active');
        $('.infosadd .bottomside .ing-l').addClass('active');
        $(this).addClass('active');
    });

    $('.infosadd .topside .inf-l').click(function(){
        $('.infosadd .topside>div').removeClass('active');
        $('.infosadd .bottomside >div').removeClass('active');
        $('.infosadd .bottomside .inf-l').addClass('active');
        $(this).addClass('active');
    });

    $('.infosadd .topside .cons-l').click(function(){
        $('.infosadd .topside>div').removeClass('active');
        $('.infosadd .bottomside >div').removeClass('active');
        $('.infosadd .bottomside .cons-l').addClass('active');
        $(this).addClass('active');
    });

    $('.infosadd .bottomside >div:first-child , .infosadd .topside >div:first-child').addClass('active');

    $('.posts-area .item').click(function(){
        var idpost = $(this).attr('id');
        $('.interna-post .' + idpost).addClass('active');
        $('.interna-post').addClass('active');
         
        var meta_title = ($('.interna-post .' + idpost).find('.title').text());
        var meta_img = ($('.interna-post .' + idpost).find('img').attr('src'));
        // console.log(meta_img);
        $("meta[property='og\\:title']").attr("content", meta_title);
        $("meta[property='og\\:image']").attr("content", meta_img);
        window.history.pushState("", null, window.location.href + '&post=' + idpost);
    });
    $('.posts-area .item .button').click(function(){
        var idpost = $(this).parent().attr('id');
        $('.interna-post .' + idpost).addClass('active');
       


        $('.interna-post').addClass('active');
    });
    $('#galeria .galery .item-galery, .historias .item').click(function(){
        var idpost = $(this).attr('id');
        $('.interna-post .' + idpost).addClass('active');
        $('.interna-post').addClass('active');
    });

    $('.interna-post .voltar , .interna-post .close').click(function(){
        $('.interna-post .item').removeClass('active');
        $('.interna-post').removeClass('active');
        $urlads = window.location.href.split("&post");
        window.history.pushState("", null, $urlads[0]);
    });

    $('.it-area-quem .left-area .list-areas:nth-child(1)').addClass('selected');
    $('.it-area-quem .right-area > div:nth-child(1)').addClass('active');


    $('.it-area-quem .left-area .list-areas').click(function(){
        $('.it-area-quem .left-area .list-areas').removeClass('selected');
        var local = $(this).attr('data-locale');
        $(this).addClass('selected');
        $('.it-area-quem .right-area > div').removeClass('active');
        $('.it-area-quem .right-area #' + local).addClass('active');
    });

    $('#fale-com-lactalis .listduvidas .item').click(function(){
        $(this).toggleClass('active');
    });
});

$(window).scroll(function() {
    if(!FLAG_COUNTER) {
        if (document.getElementById("infos-counter")){
            if($(window).scrollTop() > $('#infos-counter').offset().top - $(window).height()) {
                FLAG_COUNTER = true;
                animated_counter();
           }
        }
    }
});


function animated_counter() {
    var element = $('.count');
    $(element).each(function(i, el){
        var text = $(el).text(),
            count_numbers = 0;

        // var dimensions = text.textDimensions({
        //     fontFamily: '\'Oswald\', sans-serif',
        //     fontSize: '80px',
        //     fontWeight: 'bold',
        //     singleLine: true
        // });

        $(el).css({
            // width: dimensions.width,
            display: 'block'
        });

        for(var j=0; j<text.length; j++) {
            if(text.charCodeAt(j) >= 48 && text.charCodeAt(j) <= 57) {
                count_numbers++;
            }
        }

        if(count_numbers == text.length) {
            $(el).prop('count',0).animate({
                count: $(el).data('count')
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $(el).text(Math.ceil(now));
                }
            });
        }
    });
}

$('.diff-size .bottomside .button-open-form').click(function(){
    $('#area-seja-um-produtor').addClass('active');
});
$('#area-seja-um-produtor .close, #area-seja-um-produtor .voltar').click(function(){
    $('#area-seja-um-produtor').removeClass('active');
});


$('#area-seja-um-produtor form input[type="radio"]').change(function(){
    if($(this).val() == 'juridica'){
        $('#area-seja-um-produtor form #cpf').css('display' , 'none');
        $('#area-seja-um-produtor form #cnpj').css('display' , 'block');
        $('#area-seja-um-produtor form #cpf').attr('data-required' , 'false');
        $('#area-seja-um-produtor form #cnpj').attr('data-required' , 'true');
    }else{
        $('#area-seja-um-produtor form #cpf').css('display' , 'block');
        $('#area-seja-um-produtor form #cnpj').css('display' , 'none');
        $('#area-seja-um-produtor form #cpf').attr('data-required' , 'true');
        $('#area-seja-um-produtor form #cnpj').attr('data-required' , 'false');
    }
});

function sejaprodutor() {
    var form = $('#seja-produtor')
    var language = $('meta[property="og:locale"]').attr('content');

    var translations = {
        pt_BR: {
            cnpj: {
                required: 'Digite seu CNPJ'
            },
            cpf: {
                required: 'Digite seu CPF'
            },
            nomeprodutor: {
                required: 'Digite seu nome'
            },
            emailprodutor: {
                required: 'Digite seu email',
                email: 'Email inválido'
            },
            telefoneprodutor: {
                required: 'Digite seu telefone'
            },
            inscricao: {
                required: 'Digite sua inscrição'
            },
            incra: {
                required: 'Digite o número'
            },
            enderecoprodutor: {
                required: 'Digite seu endereço'
            },
            numero: {
                required: 'Digite seu número'
            },
            cep: {
                required: 'Digite seu CEP'
            },
            local: {
                required: 'Digite seu local'
            },
            municipio: {
                required: 'Digite seu município'
            },
            estado: {
                required: 'Digite seu estado'
            },
            atuacao: {
                required: 'Digite a atuação do estabelecimento'
            },
            agronegocio: {
                required: 'Digite o tipo do agronegocio'
            },
            especie: {
                required: 'Digite a especie animal'
            },
            saldo: {
                required: 'Digite o seu saldo'
            }
        },
        fr_FR: {
            cnpj: {
                required: 'Entrez votre CNPJ'
            },
            cpf: {
                required: 'Entrez votre CPF'
            },
            nomeprodutor: {
                required: 'Entrez votre nom'
            },
            emailprodutor: {
                required: 'Entrez votre email',
                email: 'Email invalide'
            },
            telefoneprodutor: {
                required: 'Entrez votre numéro de téléphone'
            },
            inscricao: {
                required: 'Entrez votre abonnement'
            },
            incra: {
                required: 'Entrez le numéro'
            },
            enderecoprodutor: {
                required: 'Entrez votre adresse'
            },
            numero: {
                required: 'Entrez votre numéro'
            },
            cep: {
                required: 'Entrez votre code postal'
            },
            local: {
                required: 'Entrez votre emplacement'
            },
            municipio: {
                required: 'Entrez votre comté'
            },
            estado: {
                required: 'Entrez votre statut'
            },
            atuacao: {
                required: 'Entrez l`activité de l`établissement'
            },
            agronegocio: {
                required: 'Entrez le type d`agroalimentaire'
            },
            especie: {
                required: 'Entrez les espèces animales'
            },
            saldo: {
                required: 'Entrez votre solde'
            }
        }
    }

    var rules = {}, messages = {};
    var validations = [
        "required",
        "cnpj",
        "cpf",
        "nomeprodutor",
        "emailprodutor",
        "telefoneprodutor",
        "inscricao",
        "incra",
        "enderecoprodutor",
        "numero",
        "cep",
        "local",
        "municipio",
        "estado",
        "atuacao",
        "agronegocio",
        "especie",
        "saldo"
    ];

    // $('#seja-produtor').find('input, select, textarea').not(':input[type=submit], button').each(function(i, el) {
    //     var name = $(el).attr('name');
    //     if(!rules[name]) rules[name] = {};
    //     if(!messages[name]) messages[name] = {};

    //     $.each(validations, function(j, val) {
    //         var attr = $(el).attr('data-'+val);
    //         if (typeof attr !== typeof undefined && attr !== false) {
    //             rules[name][val] = $(el).data(val);
    //             messages[name][val] = '<span>' + translations[language][name][val] + '</span>';
    //         }
    //     });
    // });

    $('#seja-produtor').validate({
        rules: rules,
        messages: messages,
        submitHandler: function (form) {
            var options = {
                beforeSubmit: showRequest,
                success: showResponse,
                resetForm: true
            };
            $(form).ajaxSubmit(options);
            return false;

        },
        errorLabelContainer: $('#msgs-contato')
    });

    function showRequest(formData, jqForm, options) {
        $('#msgs-contato').html('<span style="color: #46494c;">Enviando...</span>');
            $('#msgs-contato').show();
    }

    function showResponse(data, jqForm) {
        switch ($.trim(data)) {
            case 'true':
                $('#msgs-contato').html('<span style="color: #73c928;">Enviado com sucesso</span>');
                $('#msgs-contato').show();
                break;
            case 'false':
                $('#msgs-contato').html('<span style="color: #dd1111;">Erro inesperado</span>');
                $('#msgs-contato').show();
                break;
            case 'invalid_captcha':
                $('#msgs-contato').html('<span style="color: #dd1111;">Captcha inválido</span>');
                $('#msgs-contato').show();
                break;
        }

        setTimeout(function () {
            $('#msgs-contato').html('').hide();
        }, 5000);
    }
}





function faleconosco() {
    var form = $('#form-fale-conosco')
    var language = $('meta[property="og:locale"]').attr('content');

    var translations = {
        pt_BR: {
            emailcontato: {
                required: 'Digite seu email',
                email: 'Email inválido'
            },
            nome: {
                required: 'Digite seu nome'
            },
            telefone: {
                required: 'Digite seu telefone'
            },
            assunto: {
                required: 'Digite seu assunto'
            },
            estado: {
                required: 'Digite seu estado'
            },
            cidade: {
                required: 'Digite sua cidade'
            },
            mensagem: {
                required: 'Digite sua mensagem'
            }
        },
        fr_FR: {
            emailcontato: {
                required: 'Entrez votre email',
                email: 'Email invalide'
            },
            nome: {
                required: 'Entrez votre nom'
            },
            telefone: {
                required: 'Entrez votre numéro de téléphone'
            },
            assunto: {
                required: 'Entrez votre sujet'
            },
            estado: {
                required: 'Entrez votre état'
            },
            cidade: {
                required: 'Entrez votre la ville'
            },
            mensagem: {
                required: 'Entrez votre message'
            }
        }
    }

    var rules = {}, messages = {};
    var validations = [
        "required",
        "emailcontato",
        "nome",
        "telefone",
        "assunto",
        "estado",
        "cidade",
        "mensagem"
    ];

    // $('#form-fale-conosco').find('input, select, textarea').not(':input[type=submit], button').each(function(i, el) {
    //     var name = $(el).attr('name');
    //     if(!rules[name]) rules[name] = {};
    //     if(!messages[name]) messages[name] = {};

    //     $.each(validations, function(j, val) {
    //         var attr = $(el).attr('data-'+val);
    //         if (typeof attr !== typeof undefined && attr !== false) {
    //             rules[name][val] = $(el).data(val);
    //             messages[name][val] = '<span>' + translations[language][name][val] + '</span>';
    //         }
    //     });
    // });

    $('#form-fale-conosco').validate({
        rules: rules,
        messages: messages,
        submitHandler: function (form) {
            var options = {
                beforeSubmit: showRequest,
                success: showResponse,
                resetForm: true
            };
            $(form).ajaxSubmit(options);
            return false;

        },
        errorLabelContainer: $('#msgs-contato')
    });

    function showRequest(formData, jqForm, options) {
        $('#msgs-contato').html('<span style="color: #46494c;">Enviando...</span>');
            $('#msgs-contato').show();
    }

    function showResponse(data, jqForm) {
        switch ($.trim(data)) {
            case 'true':
                $('#msgs-contato').html('<span style="color: #73c928;">Enviado com sucesso</span>');
                $('#msgs-contato').show();
                break;
            case 'false':
                $('#msgs-contato').html('<span style="color: #dd1111;">Erro inesperado</span>');
                $('#msgs-contato').show();
                break;
            case 'invalid_captcha':
                $('#msgs-contato').html('<span style="color: #dd1111;">Captcha inválido</span>');
                $('#msgs-contato').show();
                break;
        }

        setTimeout(function () {
            $('#msgs-contato').html('').hide();
        }, 5000);
    }
}



function contato() {
    var form = $('#form-contato')
    var language = $('meta[property="og:locale"]').attr('content');

    $('input[name=dataprevista]').mask('99/99/9999');

    var translations = {
        pt_BR: {
            emailcontato: {
                required: 'Digite seu email',
                email: 'Email inválido'
            },
            nome: {
                required: 'Digite seu nome'
            },
            telefone: {
                required: 'Digite seu telefone'
            },
            assunto: {
                required: 'Digite seu assunto'
            },
            mensagem: {
                required: 'Digite sua mensagem'
            }
        },
        fr_FR: {
            emailcontato: {
                required: 'Entrez votre email',
                email: 'Email invalide'
            },
            nome: {
                required: 'Entrez votre nom'
            },
            telefone: {
                required: 'Entrez votre numéro de téléphone'
            },
            assunto: {
                required: 'Entrez votre sujet'
            },
            mensagem: {
                required: 'Entrez votre message'
            }
        }
    }

    var rules = {}, messages = {};
    var validations = [
        "required",
        "email",
        "date",
        "number",
        "digit",
        "minlength",
        "maxlength"
    ];

    // $(form).find('input, select, textarea').not(':input[type=submit], button').each(function(i, el) {
    //     var name = $(el).attr('name');
    //     if(!rules[name]) rules[name] = {};
    //     if(!messages[name]) messages[name] = {};

    //     $.each(validations, function(j, val) {
    //         var attr = $(el).attr('data-'+val);
    //         if (typeof attr !== typeof undefined && attr !== false) {
    //             rules[name][val] = $(el).data(val);
    //             messages[name][val] = '<span>' + translations[language][name][val] + '</span>';
    //         }
    //     });
    // });

    $('#form-contato').validate({
        rules: rules,
        messages: messages,
        submitHandler: function (form) {
            var options = {
                beforeSubmit: showRequest,
                success: showResponse,
                resetForm: true
            };
            $(form).ajaxSubmit(options);
            return false;

        },
        errorLabelContainer: $('#msgs-contato')
    });

    function showRequest(formData, jqForm, options) {
        $('#msgs-contato').html('<span style="color: #46494c;">Enviando...</span>');
            $('#msgs-contato').show();
    }

    function showResponse(data, jqForm) {
        switch ($.trim(data)) {
            case 'true':
                $('#msgs-contato').html('<span style="color: #73c928;">Enviado com sucesso</span>');
                $('#msgs-contato').show();
                break;
            case 'false':
                $('#msgs-contato').html('<span style="color: #dd1111;">Erro inesperado</span>');
                $('#msgs-contato').show();
                break;
            case 'invalid_captcha':
                $('#msgs-contato').html('<span style="color: #dd1111;">Captcha inválido</span>');
                $('#msgs-contato').show();
                break;
        }

        setTimeout(function () {
            $('#msgs-contato').html('').hide();
        }, 5000);
    }
}



function news(){
    $('#newsletter').validate({
        rules: {
            'email': { required: true, email: true}
        },
        messages: {
            'email': { required: '<span style="color: red;">Digite seu email<span>', email: '<span style="color: red;">Email inv&aacute;lido</span>' },
        },
        submitHandler: function (form) {
        var options = {
            beforeSubmit: showRequestFooter,
            success: showResponseFooter,
            resetForm: true
        };
        $(form).ajaxSubmit(options);
            return false;
        },
            errorLabelContainer: $('#msgs-news')
    });
    function showRequestFooter(formData, jqForm, options) {
        $('#msgs-news').html('Enviando...');
        $('#msgs-news').show();
    }
    function showResponseFooter(data, jqForm) {
        switch ($.trim(data)) {
            case 'true':
                $('#msgs-news').html('<span style="color: #73c928;">Enviado com sucesso</span>');
                $('#msgs-news').show();
            break;
            case 'false':
                $('#msgs-news').html('<span style="color: red;">Erro inesperado</span>');
                $('#msgs-news').show();
            break;
            case 'cadastrado':
                $('#msgs-news').html('<span style="color: red;">Email j&aacute; cadastrado!</span>');
                $('#msgs-news').show();
            break;
        }
        setTimeout(function () {
            $('#msgs-news').html('').hide();
        }, 2000);
    }
}


$('.ancora').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        link_atual = $(this).attr('href').split('#');
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            history.pushState(null, null, '#' + link_atual[1]);
            return false;
        }
    }
});



function load_cities_by_state() {
    $('#estado').on('change', function() {
        var state_id = $(this).find('option:selected').val();
        
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: 'POST',
            dataType: 'json',
            data: ({
                action: 'load_cities',
                state_id: state_id
            }),
            success: function(data) {
                if(cidades = data.cities) {
                    $.each(cidades, function(i, cidade) {
                        var cidade = "<option value='" + cidade.id + "'>" + cidade.nome + "</option>";
                        $('#cidade').append(cidade);
                    });
                    $('#cidade').prop('disabled', false);
                }
            }
        });
    });
}


function read_more_comunicados() {
    $('.com_content .read_more').on('click', function() {
        var button = $(this),
            post_id = $(button).data('post-id');

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: 'POST',
            dataType: 'json',
            data: ({
                action: 'read_more_comunicados',
                post_id: post_id
            }),
            beforeSend: function() {
                $(button).append('<i class="fa fa-spinner fa-w-16 fa-spin fa-lg"></i>');
                $(button).find('i').css({
                    fontSize: '17px',
                    marginLeft: '7px',
                    color: '#52b5de'
                });
            },
            success: function(data) {
                $(button).find('i').remove();
                if(data.response == true) {
                    var content = data.content;

                    $(button).closest('.com_content').find('p').first().not('.read_more').html(content);
                }
                $(button).remove();
            }
        });
    });
}


function trabalhe_conosco() {
    var form = $('#form-trabalhe-curriculo')
    var language = $('meta[property="og:locale"]').attr('content');

    var translations = {
        pt_BR: {
            nome_trabalhe: {
                required: 'Digite seu nome'
            },
            email_trabalhe: {
                required: 'Digite seu email',
                email: 'Email inválido'
            },
            mensagem_trabalhe: {
                required: 'Digite sua mensagem'
            },
            area_trabalhe: {
                required: 'Selecione sua área de interesse'
            },
            attachment_curriculo: {
                required: 'Anexe seu currículo'
            }
        },
        fr_FR: {
            nome_trabalhe: {
                required: 'Digite seu nome'
            },
            email_trabalhe: {
                required: 'Digite seu email',
                email: 'Email inválido'
            },
            mensagem_trabalhe: {
                required: 'Digite sua mensagem'
            },
            area_trabalhe: {
                required: 'Selecione sua área de interesse'
            },
            attachment_curriculo: {
                required: 'Anexe seu currículo'
            }
        }
    }

    var rules = {}, messages = {};
    var validations = [
        "required",
        "email",
        "date",
        "number",
        "digit",
        "minlength",
        "maxlength"
    ];

    // $(form).find('input, select, textarea').not(':input[type=submit], button').each(function(i, el) {
    //     var name = $(el).attr('name');
    //     if(!rules[name]) rules[name] = {};
    //     if(!messages[name]) messages[name] = {};

    //     $.each(validations, function(j, val) {
    //         var attr = $(el).attr('data-'+val);
    //         if (typeof attr !== typeof undefined && attr !== false) {
    //             if($.inArray(val, ["required", "email", "date", "number", "digit"]) > -1) {
    //                 rules[name][val] = true;
    //             } else {
    //                 rules[name][val] = $(el).data(val);
    //             }
    //             messages[name][val] = '<span>' + translations[language][name][val] + '</span>';
    //         }
    //     });
    // });

    var validation = $(form).validate({
        rules: rules,
        messages: messages,
        submitHandler: function (form) {
            var options = {
                beforeSubmit: showRequest,
                success: showResponse,
                resetForm: true
            };
            $(form).ajaxSubmit(options);
            return false;

        },
        errorLabelContainer: $('#msgs_trabalhe')
    });

    function showRequest(formData, jqForm, options) {
        $('#msgs_trabalhe').html('<span style="color: #46494c;">Enviando...</span>');
        $('#msgs_trabalhe').show();
    }

    function showResponse(data, jqForm) {
        switch ($.trim(data)) {
            case 'true':
                $('#msgs_trabalhe').html('<span style="color: #73c928;">Enviado com sucesso</span>');
                $('#msgs_trabalhe').show();
                break;
            case 'false':
                $('#msgs_trabalhe').html('<span style="color: #dd1111;">Erro inesperado</span>');
                $('#msgs_trabalhe').show();
                break;
            case 'invalid_captcha':
                $('#msgs_trabalhe').html('<span style="color: #dd1111;">Captcha inválido</span>');
                $('#msgs_trabalhe').show();
                break;
        }

        setTimeout(function () {
            $('#msgs_trabalhe').html('').hide();
        }, 5000);
    }


    $('#form-trabalhe-curriculo .attachment-file input[name=attachment_curriculo]').on('change', function() {
        var name = $(this).get(0).files[0].name;
        
        $(this).closest('.attachment-file').find('.info').html(name);
    });
}


$('#list-vagas .content .close').on('click', function() {
    $('#list-vagas').slideUp();
});



