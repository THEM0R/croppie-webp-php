$(function() {
    // modal
    var modal_selector                = $('#kinopoisk-poster');
    var modal_inputs                  = $('#kinopoisk-poster .inputs');
    var modal_preview                 = $('#kinopoisk-poster .preview');
    var modal_pars_button             = $('#kinopoisk-poster #poster_pars');
    var modal_url_button              = $('#kinopoisk-upload-url');
    var modal_input_button            = $('#kinopoisk-upload');
    var modal_cropie                  = $('#kinopoisk-upload-croppie');
    var modal_ajax_result             = $('#kinopoisk-poster .ajax #ajax');
    var modal_ajax                    = $('#kinopoisk-poster .ajax');
    var modal_ajax_two                = $('#kinopoisk-poster .ajax.two');
    var modal                         = $('#kinopoisk-poster.modal');
    // view
    var view_poster_input             = $(".poster input[name=poster]");
    var view_kpid                     = $('[name=kpid]');
    var view_preview                  = $('.poster .preview');
    var view_overlay                  = $('.poster .overlay');
    var view_error                    = $('.error');
    var view_poster_link              = $('.poster .link');
    var view_no_photo                 = $('.poster #no-photo');
    // action
    view_poster_link.click(function(event) {
        event.preventDefault();
        modal.modal({
            fadeDuration: 250,
            showClose: false
        });
    });
    modal_preview.hide().html('');
    modal_cropie.hide();
    modal_ajax_two.hide();
    view_error.hide();
    // poster pars
    modal_pars_button.click(function () {

        if( view_kpid.val().length <= 2 ){
            view_error.text('Введи KP ID').show();
        }else {
            $.ajax({
                type: 'POST',
                url: '/admin/kinopoisk/film/poster',
                data: {
                    kp_id: view_kpid.val()
                },
                dataType: 'json',
                success: function (response) {

                    var data = response.data;

                    modal_inputs.hide();

                    modal_selector.addClass('modal-900');

                    modal_preview.append(data);

                    modal_preview.show();

                    modal_preview.children('img').click(function () {

                        modal_preview.hide().html('');

                        modal_selector.removeClass('modal-900');

                        var img = $(this);
                        var url = img.attr('src');
                        var format = url.split('.').pop().toLowerCase();

                        if( $.inArray(format, ['gif','png','jpg','jpeg']) == -1 ) {

                            $(this).val('');
                            alert('Недопустимый формат файла');

                        }else {

                            $.ajax({
                                type: 'POST',
                                url: '/upload/image/url',
                                data: {
                                    url: url
                                },
                                dataType: 'json',
                                success: function (response) {

                                    if (response.type != 'error') {
                                        // croppie
                                        modal_cropie.croppie('bind', {
                                            url: response.data
                                        }).then(function(){
                                            console.log('jQuery bind complete');
                                        });

                                        modal_selector.addClass('modal-600');

                                        modal_inputs.hide();

                                        modal_ajax.show();

                                        modal_cropie.show();

                                    }else{

                                    }
                                }
                            });

                            $(this).val('');
                        }

                    });

                }
            });



        }

    });
    // upload url
    modal_url_button.change(function () {

        var url = $(this).val();

        var format = url.split('.').pop().toLowerCase();

        if( $.inArray(format, ['gif','png','jpg','jpeg']) == -1 ) {

            $(this).val('');
            alert('Недопустимый формат файла');

        }else {

            $.ajax({
                type: 'POST',
                url: '/upload/image/url',
                data: {
                    url: url
                },
                dataType: 'json',
                success: function (response) {

                    if (response.type != 'error') {

                        modal_cropie.croppie('bind', {
                            url: response.data
                        }).then(function(){
                            console.log('jQuery bind complete');
                        });

                        modal_selector.addClass('modal-600');

                        modal_inputs.hide();

                        modal_ajax.show();

                        modal_cropie.show();

                    }else{

                    }
                }
            });

            $(this).val('');
        }

    });
    // upload input
    modal_input_button.change(function () {

        var poster = this.files[0];

        var format = poster.name.split('.').pop().toLowerCase();

        if( $.inArray(format, ['gif','png','jpg','jpeg']) == -1 ) {

            $(this).val('');
            alert('Недопустимый формат файла');

        }else {
            var reader = new FileReader();

            reader.onload = function (e) {

                modal_cropie.croppie('bind', {
                    url: e.target.result
                }).then(function(){
                    console.log('jQuery bind complete');
                });

                modal_selector.addClass('modal-600');

                modal_inputs.hide();

                modal_ajax.show();

                modal_cropie.show();

            };

            reader.readAsDataURL(poster);
        }

    });
    // ajax result
    modal_ajax_result.click(function () {

        modal_cropie.croppie('result', {

            type: 'base64',
            size: 'viewport',
            format: 'jpeg'

        }).then(function (resp) {

            view_preview.css('background-image',"url('"+resp+"')").show();
            view_overlay.show();

            view_poster_input.attr('value',resp).attr('data-type','base64');

            view_preview.show();
            view_poster_link.hide();
            view_no_photo.hide();

            modal_input_button.val('');

            modal_cropie.children('div').children('img').attr('src','');

            modal_selector.removeClass('modal-600');

            modal_inputs.show();

            modal_preview.hide().html('');

            modal_ajax.hide();
            modal_cropie.hide();
            $.modal.close();

        });

    });

    // others
    modal_cropie.croppie({

        enableExif: true,
        viewport: {
            width: 300,
            height: 420,
            type: 'canvas'
        },
        boundary: {
            width: 520,
            height: 450
        }
    });

    // delete
    $('.poster .overlay #delete').click(function(){
        view_poster_link.show();
        view_no_photo.show();

        view_preview.hide();
        view_overlay.hide();
        view_preview.css('background-image',"url('')").hide();
        view_poster_input.attr('value','');
    });

    modal_selector.on($.modal.CLOSE,function () {

        modal_input_button.val('');

        view_error.text('').hide();

        modal_cropie.children('div').children('img').attr('src','');

        modal_cropie.hide();

        modal_inputs.show();

        modal_preview.hide().html('');

        modal_ajax.hide();

        modal_selector.removeClass('modal-600');
        modal_selector.removeClass('modal-900');

    });

    $('#kinopoisk-poster .ajax #no').click(function(){
        $.modal.close();
    });

    view_preview.mouseover(function () {
        view_overlay.css({'opacity':'1'});
    });
    view_preview.mouseout(function () {
        view_overlay.css({'opacity':'0'});
    });
    view_overlay.mouseover(function () {
        $(this).css({'opacity':'1'});
    });
    view_overlay.mouseout(function () {
        $(this).css({'opacity':'0'});
    });

});