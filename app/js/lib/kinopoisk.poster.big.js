$(function() {
    // modal
    var modal_selector                = $('#kinopoisk-poster-big');
    var modal_inputs                  = $('#kinopoisk-poster-big .inputs');
    var modal_preview                 = $('#kinopoisk-poster-big .preview');
    var modal_pars_button             = $('#kinopoisk-poster-big #poster-big-pars');
    var modal_url_button              = $('#kinopoisk-upload-big-url');
    var modal_input_button            = $('#kinopoisk-upload-big');
    var modal_cropie                  = $('#kinopoisk-upload-big-croppie');
    var modal_ajax_result             = $('#kinopoisk-poster-big .ajax #ajax');
    var modal_ajax                    = $('#kinopoisk-poster-big .ajax');
    var modal_ajax_two                = $('#kinopoisk-poster-big .ajax.two');
    var modal                         = $('#kinopoisk-poster-big.modal');
    // view
    var view_poster_input             = $(".poster-big input[name=poster_big]");
    var view_kpid                     = $('[name=kpid]');
    var view_preview                  = $('.poster-big .preview');
    var view_overlay                  = $('.poster-big .overlay');
    var view_error                    = $('.error');
    var view_poster_link              = $('.poster-big .link');
    var view_no_photo                 = $('.poster-big #no-photo');
    // action
    view_poster_link.click(function(event) {
        event.preventDefault();
        modal.modal({
            fadeDuration: 250,
            showClose: false
        });
    });
    modal_cropie.hide();
    modal_preview.hide().html('');
    modal_ajax_two.hide();

    // pars button
    modal_pars_button.click(function () {

        if( view_kpid.val().length <= 2 ){
            alert('не мение 2 символов!!!')
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

                            this.val('');
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

                }
            });



        }

    });
    // upload url
    modal_url_button.change(function () {

        var url = $(this).val();

        var format = url.split('.').pop().toLowerCase();

        if( $.inArray(format, ['gif','png','jpg','jpeg']) == -1 ) {

            this.val('');
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

            this.val('');
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

            view_poster_input.attr('value',resp);

            view_preview.show();

            view_poster_link.hide();
            view_no_photo.hide();

            modal_input_button.val('');


            modal_cropie.children().children('img').attr('src','');

            modal_selector.removeClass('modal-600');

            modal_inputs.show();

            modal_ajax.hide();

            modal_preview.hide().html('');

            modal_cropie.hide();


            $.modal.close();


        });

    });

    // others
    $('.poster-big .overlay #delete').click(function(){

        view_poster_link.show();
        view_no_photo.show();
        view_overlay.hide();

        view_preview.css('background-image',"url('')").hide();
        view_poster_input.attr('value','');

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


    modal_cropie.croppie({

        enableExif: true,
        viewport: {
            width: 485,
            height: 300,
            type: 'canvas'
        },
        boundary: {
            width: 520,
            height: 350
        }
    });

    modal_selector.on($.modal.CLOSE,function () {

        modal_input_button.val('');

        modal_cropie.children().children('img').attr('src','');

        modal_cropie.hide();

        modal_inputs.show();

        modal_ajax.hide();

        modal_preview.hide().html('');

        modal_selector.removeClass('modal-600');
        modal_selector.removeClass('modal-900');

    });

    $('#kinopoisk-poster-big .ajax #no').click(function(){
        $.modal.close();
    });


});